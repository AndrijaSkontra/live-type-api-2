import cors from "cors";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config.js";
import gameScoreRouter from "./app/routes/game-scores.routes.js";
import handleSocketConnection from "./app/services/socket.js";
import { auth } from "express-openid-connect";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FE_URL,
  }),
);

app.use("/game-scores", gameScoreRouter);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: "http://localhost:3000",
  clientID: "fGXQZtF8J0kTtWRxD86iUK4l6950jSyf",
  issuerBaseURL: "https://dev-c0fffp3fa1nbkbn6.us.auth0.com",
};

app.use(auth(config));

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

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
