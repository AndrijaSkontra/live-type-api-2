require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const gameScoreRouter = require("./app/routes/game-scores.routes.cjs");
const authRouter = require("./app/routes/auth.routes.cjs");
const wordsRouter = require("./app/routes/words.routes.cjs");
const mobileRouter = require("./app/routes/mobile-app-routes.cjs");
const handleSocketConnection = require("./app/services/socket.cjs");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FE_URL,
    credentials: true,
  }),
);

app.use("/game-scores", gameScoreRouter);
app.use("/auth", authRouter);
app.use("/words", wordsRouter);
app.use("/shortcuts", mobileRouter);

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
