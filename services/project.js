const error = require("../constants/error_message");
const success = require("../constants/success_message");
const { User, Project } = require("../models");
const { random_id } = require("../helpers");

async function list(uid) {
  const user = await User.findOne({ _id: uid }).populate("projects");

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS,
    payload: {
      length: user.projects.length,
      projects: user.projects.map(project => transformProject(project))
    }
  };
}

async function new_project(uid, name) {
  const owner = await User.findOne({ _id: uid });

  const newProject = new Project({
    name,
    unique_id: random_id.generate(),
    ownership: uid
  });

  // Save project
  await newProject.save();

  // Add to user model
  owner._doc.projects.push(newProject.id);
  await owner.save();

  return {
    status: success.status.CREATED,
    msg: success.message.SUCCESS
  };
}

async function getProject(id, uid) {
  const project = await Project.findOne({ _id: id });

  if (project) {
    if (project._doc.ownership.toString() === uid) {
      return {
        status: success.status.OK,
        msg: success.message.SUCCESS,
        payload: {
          project: transformProject(project)
        }
      };
    } else {
      return {
        status: error.status.FORBIDDEN,
        msg: error.message.UNAUTHORIZED
      };
    }
  } else {
    return {
      status: error.status.NOT_FOUND,
      msg: error.message.PROJECT_NOT_FOUND
    };
  }
}

async function deleteProject(id, uid) {
  const project = await Project.findOne({ _id: id, ownership: uid });

  if (project) {
    await project.remove();
    return {
      status: success.status.OK,
      msg: success.message.SUCCESS
    };
  } else {
    return {
      status: error.status.FORBIDDEN,
      msg: error.message.UNAUTHORIZED
    };
  }
}

function transformProject(project) {
  return {
    ...project._doc,
    __v: undefined,
    ownership: undefined,
    updatedAt: undefined
  };
}

module.exports = {
  list,
  new_project,
  getProject,
  deleteProject
};
