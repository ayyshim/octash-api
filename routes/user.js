const UserService = require("../services/user");

module.exports = router => {
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await UserService.login(username, password);
    return res.status(result.status).json(result);
  });

  router.post("/register", async (req, res) => {
    const result = await UserService.register(req.body);
    return res.status(result.status).json(result);
  });

  return router;
};
