const mongoose = require("mongoose");

exports.connect = (url, runApp) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const connection = mongoose.connection;

  connection.once("error", e => {
    throw Error("Something went wrong with mongodb connection. \n" + e);
  });

  connection.on("open", () => runApp());
};
