const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DatabaseSchema = new Schema(
  {
    project: {
      type: String,
      ref: "Project"
    },
    col: {
      type: String,
      required: true,
      trim: true
    },
    documentID: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    document: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Database", DatabaseSchema);
