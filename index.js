import cors from "cors";
import express from "express";
import { addGameScore, getBestUserScores } from "./services/game-scores.js";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FE_URL,
  }),
);

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

//  NOTE: Socket.IO config below

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FE_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("event2", (data) => {
    io.emit("letter", `position of ${socket.id}: ${data}`);
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
