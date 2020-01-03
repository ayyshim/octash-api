const { selectProject } = require("../middlewares");
const { DatabaseService } = require("../services");

module.exports = router => {
  const databaseRouter = router;

  databaseRouter.post("/data/:col/set", async (req, res) => {
    const { project_id } = req;
    const { col } = req.params;
    const { data } = req.body;
    const result = await DatabaseService.set(project_id, col, data);
    res.status(result.status).json(result);
  });

  databaseRouter.post("/data/:collection", async (req, res) => {
    const { project_id } = req;
    const { collection } = req.params;

    const { fields, condition } = req.body;
    const option = {
      fields,
      condition
    };

    const result = await DatabaseService.getCollectionDatas(
      project_id,
      collection,
      option
    );
    res.status(result.status).json(result);
  });

  databaseRouter.post("/data/:collection/:doc", async (req, res) => {
    const { project_id } = req;
    const { collection, doc } = req.params;
    const { fields } = req.body;
    const option = { fields };
    const result = await DatabaseService.getDocument(
      project_id,
      collection,
      doc,
      option
    );
    res.status(result.status).json(result);
  });

  databaseRouter.delete("/data/:collection", async (req, res) => {
    const { project_id } = req;
    const { collection } = req.params;
    const { docs } = req.body;
    const result = await DatabaseService.deleteDocument(
      project_id,
      collection,
      docs
    );
    res.status(result.status).json(result);
  });

  databaseRouter.put("/data/:collection/:doc", async (req, res) => {
    const { project_id } = req;
    const { collection, doc } = req.params;
    const { update } = req.body;
    const result = await DatabaseService.updateDocument(
      project_id,
      collection,
      doc,
      update
    );
    res.status(result.status).json(result);
  });

  return databaseRouter;
};
