const Patient = require("../models/patient");
const patientRouter = require("express").Router();

patientRouter.get("/", (request, response) => {
  Patient.find({}).then((patients) => {
    response.json(patients);
  });
});

patientRouter.get("/:id", (request, response, next) => {
  Patient.findById(request.params.id)
    .then((patient) => {
      if (patient) {
        response.json(patient);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

patientRouter.post("/", async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    const savedpatient = await patient.save();
    res.status(201).json(savedpatient);
  } catch (error) {
    next(error);
  }
});

patientRouter.delete("/:id", (request, response, next) => {
  Patient.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

patientRouter.put("/:id", async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
});

module.exports = patientRouter;
