const UserService = require("../services/user");

module.exports = router => {
  const userRouter = router;
  userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await UserService.login(username, password);
    return res.status(result.status).json(result);
  });

  userRouter.post("/register", async (req, res) => {
    const result = await UserService.register(req.body);
    return res.status(result.status).json(result);
  });

  return userRouter;
};
