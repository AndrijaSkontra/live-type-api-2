import express from "express";
import {
  getBestUserScores,
  addGameScore,
} from "../services/game-scores.service.js";

const gameScoreRouter = express.Router();

gameScoreRouter.get("/", async (req, res) => {
  res.send(await getBestUserScores());
});

gameScoreRouter.post("/", async (req, res) => {
  try {
    await addGameScore(req.body.username, req.body.wpm);
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

export default gameScoreRouter;
