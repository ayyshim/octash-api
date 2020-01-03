const error = require("../constants/error_message");
const { Project } = require("../models");

module.exports = async (req, res, next) => {
  const api = req.headers["apix"];

  if (!api) {
    return res.status(error.status.NOT_ACCEPTABLE).json({
      status: error.status.NOT_ACCEPTABLE,
      msg: error.message.PROJECT_API_IS_UNDEFINED_OR_NULL
    });
  }

  const project = await Project.findOne({ api });

  if (!project) {
    return res.status(error.status.NOT_FOUND).json({
      status: error.status.NOT_FOUND,
      msg: error.message.PROJECT_API_INVALID
    });
  }

  req.project_id = project._doc.unique_id;
  next();
};
