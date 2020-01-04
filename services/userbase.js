const error = require("../constants/error_message");
const success = require("../constants/success_message");
const { random_id, currentDateAndTime } = require("../helpers");
const { Userbase } = require("../models");
const bcrypt = require("bcryptjs");
const { userbase_secret } = require("../config");
const jwt = require("jsonwebtoken");

async function createCredential(project, email, password) {
  const emailCheck = await Userbase.findOne({
    project,
    email
  });

  if (emailCheck) {
    return {
      status: error.status.NOT_ACCEPTABLE,
      msg: error.message.USERBASE_EMAIL_EXIST
    };
  }

  let newUser = new Userbase({
    project,
    email
  });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user_id = random_id.generate();
  newUser.password = hashedPassword;
  newUser.user_id = user_id;

  await newUser.save();

  return {
    status: success.status.CREATED,
    msg: success.message.SUCCESS,
    payload: {
      user: {
        id: user_id
      }
    }
  };
}

async function checkCredential(project, email, password) {
  const user = await Userbase.findOne({ project, email });

  if (!user) {
    return {
      status: error.status.UNAUTHORIZED,
      msg: error.message.USERBASE_INVALID_EMAIL
    };
  }

  const matchPassword = await bcrypt.compare(password, user._doc.password);

  if (!matchPassword) {
    return {
      status: error.status.UNAUTHORIZED,
      msg: error.message.USERBASE_INVALID_PASSWORD
    };
  }

  // generate auth token
  const payload = {
    uid: user.id,
    email: user._doc.email
  };

  await user.update({
    last_logged: currentDateAndTime()
  });

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS,
    payload
  };
}

async function remove(project, uid) {
  const user = await Userbase.findOne({ project, user_id: uid });

  if (user) {
    await user.remove();
    return {
      status: success.status.OK,
      msg: success.message.SUCCESS
    };
  } else {
    return {
      status: error.status.NOT_FOUND,
      msg: error.message.USERBASE_INVALID_USER
    };
  }
}

module.exports = {
  createCredential,
  checkCredential,
  remove
};
