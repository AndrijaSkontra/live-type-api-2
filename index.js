import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config.js";
import gameScoreRouter from "./app/routes/game-scores.routes.js";
import handleSocketConnection from "./app/services/socket.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FE_URL,
  }),
);

app.use("/game-scores", gameScoreRouter);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FE_URL,
  },
});

handleSocketConnection(io);

httpServer.listen(PORT, () => {
  console.log(`Live Type server is listening on port: ${PORT}`);
});
