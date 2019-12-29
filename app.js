// Installed libraries
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Custom scripts
const { mongo_db_url, port } = require("./config");
const database = require("./database");
const routes = require("./routes");
const mw = require("./middlewares");

// Create express app reference
const app = express();

// Middlewares
app.use(mw.authToken);
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/test", routes.test);
app.use("/user", routes.user);
app.use("/project", mw.isProtected, routes.project);

// Database connection
database.connect(mongo_db_url, () =>
  app.listen(port, () =>
    console.log(`Server is up and running on port ${port}.`)
  )
);
