const config = require("dotenv");

config.config();

module.exports = {
  mongo_db_url:
    process.env.MONGO_DB_URL + process.env.MONGO_DB_NAME ||
    "mongodb://localhost:27017/test",
  port: process.env.PORT || 5000,
  jwt_secret: process.env.JWT_SECRET_CODE || "secret123",
  encrypter: process.env.ENCRYPTER || "encryptingkey",
  userbase_secret: process.env.USERBASE_SECRET_KEY || "userbasesecretkey",
  host: process.env.HOST || "http://localhost:5000/"
};
