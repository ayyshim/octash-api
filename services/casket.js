const { File, Folder } = require("../models").Casket;
const { host } = require("../config");
const { random_id } = require("../helpers");
const error = require("../constants/error_message");
const success = require("../constants/success_message");
const fs = require("fs");

async function newFolder(project, folder) {
  const { parent, name } = folder;
  const folder_id = random_id.generate(13);

  const newFolder = new Folder({
    folder_id,
    project,
    name,
    parent: parent ? parent : "0"
  });

  await newFolder.save();

  return {
    status: success.status.CREATED,
    msg: success.message.SUCCESS,
    payload: {
      folder: {
        id: folder_id
      }
    }
  };
}

async function rename(project, folder_id, name) {
  const folder = await Folder.findOne({
    project,
    folder_id
  });

  if (folder) {
    await folder.update({ name: name });

    return {
      status: success.status.OK,
      msg: success.message.SUCCESS
    };
  } else {
    return {
      status: error.status.NOT_FOUND,
      msg: error.message.CASKET_FOLDER_NOT_FOUND
    };
  }
}

async function getFolders(project, parent) {
  const folders = await Folder.find({ parent, project });

  const folderList = new Array();

  folders.forEach(folder => {
    const { folder_id, name, created_at } = folder;
    folderList.push({
      folder_id,
      name,
      created_at
    });
  });

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS,
    payload: {
      length: folderList.length,
      datas: folderList
    }
  };
}

async function deleteFolder(project, folder_id) {
  if (folder_id === "0") {
    return {
      status: error.status.NOT_FOUND,
      msg: error.message.CASKET_FOLDER_NOT_FOUND
    };
  }

  const folder = await Folder.findOne({
    folder_id,
    project
  });

  if (!folder) {
    return {
      status: error.status.NOT_FOUND,
      msg: error.message.CASKET_FOLDER_NOT_FOUND
    };
  }

  const childFolders = await Folder.find({
    parent: folder_id,
    project
  });

  childFolders.forEach(async child => {
    await child.remove();
  });

  await folder.remove();

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS
  };
}

async function uploadFileReturnLink(project, fileData, path) {
  const filename = fileData.filename;
  const name = fileData.originalname;
  const size = fileData.size;
  const type = fileData.mimetype;
  const extension = name.split(".")[name.split(".").length - 1];

  const file = {
    name,
    size,
    filename,
    size,
    type,
    extension
  };

  const parent_path_id = await parent_path(project, path);

  const file_id = random_id.generate(13);

  const newFile = new File({
    file_id,
    file,
    project,
    path: parent_path_id
  });

  await newFile.save();

  return {
    status: success.status.CREATED,
    msg: success.message.SUCCESS,
    payload: {
      uri: `${host}static/${filename}`,
      name
    }
  };
}

async function getAllFiles(project, path) {
  const parent = await parent_path(project, path);

  const files = await File.find({
    path: parent,
    project
  });

  let fileList = new Array();

  files.forEach(file => {
    fileList.push({
      id: file.file_id,
      ...file.file,
      uri: `${host}static/${file.file.filename}`
    });
  });

  return {
    status: success.status.OK,
    msg: success.message.SUCCESS,
    payload: {
      length: fileList.length,
      datas: fileList
    }
  };
}

async function deleteFile(project, file_id) {
  const file = await File.findOne({
    file_id,
    project
  });

  if (!file) {
    return {
      status: error.status.NOT_FOUND,
      msg: error.message.CASKET_FILE_NOT_FOUND
    };
  }
  fs.unlinkSync(`bucket/${file.file.filename}`);
  await file.remove();
  return {
    status: success.status.OK,
    message: success.message.SUCCESS
  };
}

async function parent_path(project, path, index = 0, parent = "0") {
  let sanitizedPath = path;
  if (sanitizedPath.endsWith("/")) {
    sanitizedPath = sanitizedPath.substring(0, sanitizedPath.length - 1);
  }

  let n_path = sanitizedPath.split("/");
  const folder = await Folder.findOne({
    name: n_path[index],
    project,
    parent
  });

  if (folder) {
    if (index === n_path.length - 1) {
      return folder.folder_id;
    } else {
      return parent_path(project, path, index + 1, folder.folder_id);
    }
  } else {
    const folder_id = random_id.generate(13);
    const newFolder = new Folder({
      folder_id,
      name: n_path[index],
      parent,
      project
    });

    await newFolder.save();
    return parent_path(project, path, index, parent);
  }
}

module.exports = {
  newFolder,
  rename,
  getFolders,
  deleteFolder,
  uploadFileReturnLink,
  getAllFiles,
  deleteFile
};
