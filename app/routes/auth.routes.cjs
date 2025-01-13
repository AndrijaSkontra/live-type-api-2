const express = require("express");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
const {
  checkCredentials,
  createUser,
} = require("../services/auth.services.cjs");
const { JWT_TIME_EXPIRATION } = require("../utils/constants.cjs");

authRouter.post("/login", async (req, res) => {
  const loginSuccess = await checkCredentials(
    req.body.email,
    req.body.password,
  );
  if (loginSuccess) {
    const jwtToken = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET,
      {
        expiresIn: JWT_TIME_EXPIRATION,
      },
    );
    // todo: this should be replaced with a http only cookie
    res.send({ jwt: jwtToken });
  } else {
    res.status(403).json({ message: "Wrong Credentials" });
  }
});

authRouter.post("/register", async (req, res) => {
  const user = await createUser(req.body.email, req.body.password);
  if (user) {
    res.status(201).json({
      message: "Added User",
    });
  } else {
    res.status(400).json({ message: "User Exists" });
  }
});

module.exports = authRouter;
