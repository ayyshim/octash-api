const config = require("dotenv");

config.config();

module.exports = {
  mongo_db_url:
    process.env.MONGO_DB_URL + process.env.MONGO_DB_NAME ||
    "mongodb://localhost:27017/test",
  port: process.env.PORT || 5000
};
