const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Patient = require("../models/patient");

jest.setTimeout(20000);

const initialPatientList = [
  {
    name: "Hiroko Rosa",
    contact: 123,
    email: "rytytocix@mailinator.com",
    dob: "Feb 19, 2000",
    profile_pic: "Ex fugiat sit cumqu",
    city: "Pariatur Consectetu",
    last_appointment: "2022-12-02T18:15:00.000+00:00",
    next_appointment: "2022-12-03T18:15:00.000+00:00",
    register_date: "2022-12-01T18:15:00.000+00:00",
    special_attention: true,
  },
  {
    name: "Ethan Lambert",
    contact: 8947428,
    email: "luvimaj@mailinator.com",
    dob: "Dec 20, 1991",
    profile_pic: "ExSit veniam tempore",
    city: "Fugiat porro volupt",
    last_appointment: "Jan 20, 2022",
    next_appointment: "Jan 21, 2022",
    register_date: "Jan 22, 2022",
    special_attention: false,
  },
];

let token;
beforeEach(async () => {
  await Patient.deleteMany({});
  let patientObj = new Patient(initialPatientList[0]);
  await patientObj.save();
  patientObj = new Patient(initialPatientList[1]);
  await patientObj.save();

  const newUser = {
    fullname: "abc ef",
    email: "abc@gmail.com",
    password: "1234",
  };
  await api.post("/users/register").send(newUser);
  const result = await api.post("/users/login").send(newUser);
  token = {
    Authorization: `bearer ${result.body.token}`,
  };
});

test("all patients are returned", async () => {
  const response = await api.get("/patientList");
  expect(response.body).toHaveLength(initialPatientList.length);
});

test("the first patient is", async () => {
  const response = await api.get("/patientList");
  expect(response.body[0].name).toBe("Hiroko Rosa");
});

test("patient should contain id property", async () => {
  const response = await api.get("/patientList");
  expect(response.body[0].id).toBeDefined();
});

test("a new patient can be added", async () => {
  const newPatient = {
    name: "Stone Cold",
    contact: 98173861,
    email: "stonecold@mailinator.com",
    dob: "Feb 9, 2004",
    profile_pic: "Eitnone ",
    city: "Stockholm",
    last_appointment: "Mar 3, 2022",
    next_appointment: "Mar 3, 2022",
    register_date: "Mar 5, 2022",
    special_attention: true,
  };

  await api
    .post("/patientList")
    .send(newPatient)
    .set(token)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/patientList");
  const patients = response.body.map((r) => r.name);
  expect(response.body).toHaveLength(initialPatientList.length + 1);
  expect(patients).toContain("Stone Cold");
});

test("a new patient should not be added if fields are missing", async () => {
  const newPatient = {
    email: "stonecold@mailinator.com",
    dob: "Feb 9, 2004",
    profile_pic: "Eitnone ",
    city: "Stockholm",
  };

  await api
    .post("/patientList")
    .send(newPatient)
    .set(token)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/patientList");
  expect(response.body).toHaveLength(initialPatientList.length);
});

test("patient info can be deleted", async () => {
  const allPatients = await Patient.find({});
  console.log(allPatients);
  const patientToDelete = allPatients[0];
  await api.delete(`/patientList/${patientToDelete._id}`).expect(204);
  const result = await Patient.find({});
  console.log(result);
  expect(result.length).toBe(allPatients.length - 1);
});

test("patient info can be updated", async () => {
  const allPatients = await Patient.find({});
  const patientToUpdate = allPatients[0];
  const newPatient = {
    name: "Ethan Lambert",
    contact: 8947428,
    email: "luvimaj@mailinator.com",
    dob: "Dec 20, 1991",
    profile_pic: "ExSit veniam tempore",
    city: "Kathmandu",
    last_appointment: "Jan 20, 2022",
    next_appointment: "Jan 21, 2022",
    register_date: "Jan 22, 2022",
    special_attention: false,
  };

  await api.put(`/patientList/${patientToUpdate._id}`).send(newPatient);
  const result = await Patient.find({});
  console.log(result);
  expect(result[0].city).toBe("Kathmandu");
});

afterAll(() => {
  mongoose.connection.close();
});
