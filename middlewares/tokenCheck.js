const { jwt_secret } = require("../config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let tokenHead = req.headers["authorization"];

  if (tokenHead) {
    let token = tokenHead.split(" ")[1];
    if (token) {
      const verified = jwt.verify(token, jwt_secret);
      if (verified) {
        req.uid = verified._id;
        req.isAuth = true;
      } else {
        req.isAuth = false;
      }
    } else {
      req.isAuth = false;
    }
  } else {
    req.isAuth = false;
  }

  return next();
};
