const error = require("../constants/error_message");
const success = require("../constants/success_message");
const { jwt_secret } = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.check = (username, password) => {
  return new Promise(async (resolve, reject) => {
    const user = await User.findOne({ username });

    if (!user) {
      reject({
        status: error.status.UNAUTHORIZED,
        msg: error.message.INVALID_CREDENTIALS
      });
    } else {
      let matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        reject({
          status: error.status.UNAUTHORIZED,
          msg: error.message.INVALID_CREDENTIALS
        });
      } else {
        let payload = {
          _id: user.id
        };

        let token = jwt.sign(payload, jwt_secret);

        resolve({
          status: success.status.OK,
          msg: success.message.SUCCESS,
          payload: {
            token: token
          }
        });
      }
    }
  });
};

exports.isAvailable = async (field, value) => {
  try {
    const user = await User.findOne({ [field]: value });

    return {
      status: user === null
    };
  } catch (e) {
    throw e;
  }
};
