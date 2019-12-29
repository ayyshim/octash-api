const { ProjectService } = require("../services");

module.exports = router => {
  router.get("/list", async (req, res) => {
    const uid = req.uid;
    const result = await ProjectService.list(uid);
    res.status(result.status).json(result);
  });

  router.post("/new", async (req, res) => {
    const uid = req.uid;
    const { name } = req.body;
    const result = await ProjectService.new_project(uid, name);
    res.status(result.status).json(result);
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const uid = req.uid;

    const result = await ProjectService.getProject(id, uid);
    res.status(result.status).json(result);
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const uid = req.uid;
    const result = await ProjectService.deleteProject(id, uid);
    res.status(result.status).json(result);
  });

  return router;
};
