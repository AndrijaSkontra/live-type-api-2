import cors from "cors";
import express from "express";
import { addGameScore, getBestUserScores } from "./services/game-scores.js";
import { Server } from "socket.io";
import { createServer } from "http";

const PORT = 3000;
const app = express();
// const httpServer = createServer(app)
// const io = new Server(httpServer, {})

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:3069",
  }),
);

app.listen(PORT, () => {
  console.log("App started on port 3000");
});

app.get("/", (req, res) => {
  res.send("APP WORKS");
});

app.get("/game-scores", async (req, res) => {
  res.send(await getBestUserScores());
});

app.post("/game-scores", async (req, res) => {
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
