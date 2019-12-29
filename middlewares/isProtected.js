const error = require("../constants/error_message");

module.exports = (req, res, next) => {
  if (req.isAuth) {
    next();
  } else {
    res.status(error.status.UNAUTHORIZED).json({
      msg: error.message.UNAUTHORIZED
    });
  }
};
