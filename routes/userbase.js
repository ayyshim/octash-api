const { selectProject } = require("../middlewares");
const { UserbaseService } = require("../services");
module.exports = router => {
  const userbaseRouter = router;

  userbaseRouter.post("/create", async (req, res) => {
    const { project_id } = req;
    const { email, password } = req.body;
    const result = await UserbaseService.createCredential(
      project_id,
      email,
      password
    );
    res.status(result.status).json(result);
  });

  userbaseRouter.post("/access", async (req, res) => {
    const { project_id } = req;
    const { email, password } = req.body;
    const result = await UserbaseService.checkCredential(
      project_id,
      email,
      password
    );
    res.status(result.status).json(result);
  });

  userbaseRouter.delete("/remove/:uid", async (req, res) => {
    const { project_id } = req;
    const { uid } = req.params;
    const result = await UserbaseService.remove(project_id, uid);
    res.status(result.status).json(result);
  });

  return userbaseRouter;
};
