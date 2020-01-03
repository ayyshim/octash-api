const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FolderSchema = new Schema(
  {
    folder_id: {
      type: String,
      trim: true,
      required: true
    },
    project: {
      type: String,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    parent: {
      type: String,
      required: true,
      default: "0"
    }
  },
  {
    timestamps: true
  }
);

const FileSchema = new Schema(
  {
    project: {
      type: String,
      required: true
    },
    file_id: {
      type: String,
      required: true
    },
    file: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = {
  Folder: mongoose.model("Folder", FolderSchema),
  File: mongoose.model("File", FileSchema)
};
