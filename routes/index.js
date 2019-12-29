const router = require("express").Router();

const test_routes = require("./test_routes");

module.exports = {
  test: test_routes(router),
  user: require("./user")(router),
  project: require("./project")(router)
};
