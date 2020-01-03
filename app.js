// Installed libraries
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
// Custom scripts
const { mongo_db_url, port } = require("./config");
const database = require("./database");
const routes = require("./routes");
const mw = require("./middlewares");

// Create express app reference
const app = express();
app.use("/static", express.static(path.join(__dirname, "bucket")));
// Middlewares
app.use(mw.authToken);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/user", routes.user);
app.use("/project", mw.isProtected, routes.project);
app.use("/database", mw.selectProject, routes.database);
app.use("/userbase", mw.selectProject, routes.userbase);
app.use("/casket", mw.selectProject, routes.casket);

// Database connection
database.connect(mongo_db_url, () =>
  app.listen(port, () =>
    console.log(`Server is up and running on port ${port}.`)
  )
);
