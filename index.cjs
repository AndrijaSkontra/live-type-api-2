const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
require("dotenv").config();
const gameScoreRouter = require("./app/routes/game-scores.routes.cjs");
const handleSocketConnection = require("./app/services/socket.cjs");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require("express-openid-connect");

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
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "2THf1ya9l7flTTigebL03AoSdzWYoqPg",
  issuerBaseURL: "https://dev-c0fffp3fa1nbkbn6.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
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
