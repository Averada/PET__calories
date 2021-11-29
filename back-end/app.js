const express = require("express");
const sessions = require("express-session");
const logger = require("morgan");
const path = require("path");
const { connect } = require("mongoose");
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const multer = require("multer");
const loggerRouter = require("./routes/loggerRouter");
const mainRouter = require("./routes/mainRouter");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
// set config for static file in express
app.use(express.static("public"));


app.use("/logger", loggerRouter);
app.use("/", mainRouter);

const PORT = process.env.PORT || 2208;

// const SERVER_PORT = 8080
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
  connectDB();
});

module.exports = app;
