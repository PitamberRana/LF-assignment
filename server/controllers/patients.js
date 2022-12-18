const Patient = require("../models/patient");
const User = require("../models/user");
const patientRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const uploader = require("../multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

patientRouter.post("/", uploader.single("file"), async (req, res) => {
  const upload = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "patientImg",
  });
  return res.json({
    success: true,
    imgUrl: upload.secure_url,
  });
});

patientRouter.get("/", (req, res) => {
  Patient.find({}).then((patients) => {
    res.json(patients);
  });
});

patientRouter.get("/:id", (req, res, next) => {
  Patient.findById(req.params.id)
    .then((patient) => {
      if (patient) {
        res.json(patient);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

patientRouter.post("/", async (req, res, next) => {
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const patient = new Patient({ ...req.body, user: user.fullname });
  patient
    .save()
    .then((savedpatient) => {
      res.status(201).json(savedpatient);
    })
    .catch((error) => next(error));
});

patientRouter.delete("/:id", (req, res, next) => {
  Patient.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

patientRouter.put("/:id", (req, res, next) => {
  const patient = req.body;
  console.log(patient);
  Patient.findByIdAndUpdate(req.params.id, patient, { new: true })
    .then((updatedPateint) => {
      res.json(updatedPateint);
    })
    .catch((error) => next(error));
});

module.exports = patientRouter;
