require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const patientRouter = require("./controllers/patient");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

app.use("/patientList", patientRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
