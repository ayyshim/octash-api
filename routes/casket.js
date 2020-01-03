const { Casket } = require("../services");
const multer = require("multer");
const { random_id } = require("../helpers");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "bucket/");
  },
  filename: function(req, file, cb) {
    const extension = file.originalname.split(".")[
      file.originalname.split(".").length - 1
    ];
    const fileName = `${random_id.generate(21)}_${Date.now()}${extension &&
      `.${extension}`}`;
    console.log(fileName);
    cb(null, fileName);
  }
});

const uploads = multer({ storage: storage });

module.exports = router => {
  const casketRouter = router;

  casketRouter.post("/folder/new", async (req, res) => {
    const { project_id } = req;
    const folder = req.body;

    const result = await Casket.newFolder(project_id, folder);
    res.status(result.status).json(result);
  });

  casketRouter.put("/folder/:folder_id", async (req, res) => {
    const { project_id } = req;
    const { name } = req.body;
    const { folder_id } = req.params;
    const result = await Casket.rename(project_id, folder_id, name);
    res.status(result.status).json(result);
  });

  casketRouter.get("/folder/:parent", async (req, res) => {
    const { project_id } = req;
    const { parent } = req.params;

    const result = await Casket.getFolders(project_id, parent);
    res.status(result.status).json(result);
  });

  casketRouter.delete("/folder/:folder_id", async (req, res) => {
    const { project_id } = req;
    const { folder_id } = req.params;

    const result = await Casket.deleteFolder(project_id, folder_id);
    res.status(result.status).json(result);
  });

  casketRouter.post("/file/new", uploads.single("file"), async (req, res) => {
    const fileData = req.file;
    const { project_id } = req;
    const { path } = req.body;

    const result = await Casket.uploadFileReturnLink(
      project_id,
      fileData,
      path
    );
    res.status(result.status).json(result);
  });

  casketRouter.post("/file", async (req, res) => {
    const { path } = req.body;
    const { project_id } = req;

    const result = await Casket.getAllFiles(project_id, path);
    res.status(result.status).json(result);
  });

  casketRouter.delete("/file/delete/:file_id", async (req, res) => {
    const { file_id } = req.params;
    const { project_id } = req;

    const result = await Casket.deleteFile(project_id, file_id);
    res.status(result.status).json(result);
  });

  return casketRouter;
};
