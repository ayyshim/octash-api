const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserbaseSchema = new Schema(
  {
    project: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    last_logged: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Userbase", UserbaseSchema);
