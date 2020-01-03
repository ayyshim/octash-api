const { ProjectService } = require("../services");

module.exports = router => {
  const projectRouter = router;
  projectRouter.get("/list", async (req, res) => {
    const uid = req.uid;
    const result = await ProjectService.list(uid);
    res.status(result.status).json(result);
  });

  projectRouter.post("/new", async (req, res) => {
    const uid = req.uid;
    const { name } = req.body;
    const result = await ProjectService.new_project(uid, name);
    res.status(result.status).json(result);
  });

  projectRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const uid = req.uid;

    const result = await ProjectService.getProject(id, uid);
    res.status(result.status).json(result);
  });

  projectRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const uid = req.uid;
    const result = await ProjectService.deleteProject(id, uid);
    res.status(result.status).json(result);
  });

  return projectRouter;
};
