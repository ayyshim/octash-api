const { authentication } = require("../helpers");
const error = require("../constants/error_message");
const success = require("../constants/success_message");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

async function login(username, password) {
  try {
    const log = await authentication.check(username, password);

    return {
      ...log
    };
  } catch (e) {
    return {
      ...e
    };
  }
}

async function register(data) {
  const { username, fullname, password, email } = data;

  // Check username and email avaibility
  const isEmailExist = await authentication.isAvailable("email", email);
  const isUsernameExist = await authentication.isAvailable(
    "username",
    username
  );

  if (!isEmailExist.status) {
    return {
      status: error.status.NOT_ACCEPTABLE,
      msg: error.message.EMAIL_NOT_AVAILABLE
    };
  }

  if (!isUsernameExist.status) {
    return {
      status: error.status.NOT_ACCEPTABLE,
      msg: error.message.USERNAME_NOT_AVAILABLE
    };
  }

  // Create new user
  let newUser = new User({
    username,
    password,
    email,
    fullname
  });

  // hash password
  newUser.password = await bcrypt.hash(password, 12);

  // save new user
  await newUser.save();

  return {
    status: success.status.CREATED,
    msg: success.message.SUCCESS
  };
}
module.exports = {
  login,
  register
};
