const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require("./utils/middleware");
const patientRouter = require("./controllers/patients");
const userRouter = require("./controllers/users");

mongoose.connect(config.MONGODB_URI);

// app.use(express.static("build"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

app.use(tokenExtractor);
app.use("/patientList", patientRouter);
app.use("/users", userRouter);
// app.use("/upload", patientRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = app;
