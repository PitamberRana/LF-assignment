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

  if (password.length <= 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 4 character long." });
  }

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
    const refresh = jwt.sign(userForToken, config.REFRESH, {
      expiresIn: "7d",
    });

    res.status(200).json({ token, email: user.email, id: user.id, refresh });
  } catch (error) {
    next(error);
  }
});
userRouter.post("/renewAccessToken", async (req, res, next) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken)
      return res.status(403).json({ error: "user not authenticated" });

    const user = jwt.verify(refreshToken, config.REFRESH);
    console.log("2", user);
    const userForToken = {
      email: user.email,
      id: user.id,
    };
    const accessToken = jwt.sign(userForToken, config.SECRET, {
      expiresIn: 60 * 60,
    });
    console.log(accessToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
