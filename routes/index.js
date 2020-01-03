const router = require("express").Router();

const test_routes = require("./test_routes");

module.exports = {
  user: require("./user")(router),
  project: require("./project")(router),
  database: require("./database")(router),
  userbase: require("./userbase")(router),
  casket: require("./casket")(router)
};
