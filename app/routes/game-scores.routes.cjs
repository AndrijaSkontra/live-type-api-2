const express = require("express");
const {
  getBestUserScores,
  addGameScore,
} = require("../services/game-scores.service.cjs");
const jwt = require("jsonwebtoken");

const gameScoreRouter = express.Router();

gameScoreRouter.get("/", async (req, res) => {
  res.send(await getBestUserScores());
});

gameScoreRouter.post("/", async (req, res) => {
  const authHeader = req.headers.authorization;

  // todo: this should be in the middleware!
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: Missing or invalid Authorization header",
    });
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const email = decodedToken.email;

  try {
    await addGameScore(email, req.body.wpm);
    res.status(201).json({
      message: "Success",
      resource: req.body,
    });
  } catch {
    res.status(500).json({
      message: "Server failed",
    });
  }
});

module.exports = gameScoreRouter;
