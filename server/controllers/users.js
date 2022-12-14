const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.get("/", async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

userRouter.post("/register", async (request, response) => {
  const { fullname, email, password } = request.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      error: "email must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    fullname,
    email,
    password: passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email or password is missing!!" });

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Email doesnot exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password wrong" });
    }
    const userForToken = {
      email: user.email,
      id: user.id,
    };
    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });
    res.status(200).json({ token, email: user.email, id: user.id });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
