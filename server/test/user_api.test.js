const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

jest.setTimeout(20000);

beforeEach(async () => {
  await User.deleteMany({});
  const newUser = {
    email: "usertest@gmail.com",
    password: "1234",
  };
  await api.post("/users/register").send(newUser);
});

describe("user api test", () => {
  test("users are returned as json", async () => {
    await api
      .get("/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all users are returned", async () => {
    const response = await api.get("/users");
    console.log(response.body.length);
    expect(response.body.length).toBe(1);
  });

  test("a user should not be added if password is less than 4 characters", async () => {
    const user = {
      email: "ace@gmail.com",
      password: "123",
    };
    const response = await api.post("/users/register").send(user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Password must be at least 4 character long."
    );
  });

  test("a user should not be added if email already exists", async () => {
    const user = {
      email: "usertest@gmail.com",
      password: "12345",
    };
    const response = await api.post("/users/register").send(user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("email must be unique");
  });
});
