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

patientRouter.post("/", (req, res, next) => {
  const patient = new Patient(req.body);
  patient
    .save()
    .then((savedpatient) => {
      res.json(savedpatient);
    })
    .catch((error) => next(error));
});

patientRouter.delete("/:id", (request, response, next) => {
  Patient.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
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
