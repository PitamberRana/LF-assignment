const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  profile_pic: {
    type: String,
    required: true,
  },
  gender: { type: String },
  city: { type: String },
  last_appointment: { type: Date },
  next_appointment: { type: Date },
  register_date: { type: Date },
  special_attention: { type: Boolean },
  user: {
    type: String,
  },
});

patientSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Patient", patientSchema);
