import cors from "cors";
import express from "express";
import { addGameScore, getBestUserScores } from "./services/game-scores.js";
import { Server } from "socket.io";
import { createServer } from "http";
import "dotenv/config.js";
import { RoomStatus } from "./utils/enums.js";
import { TypeRoom } from "./utils/room.js";

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
  console.log("\n/game-scores POST BODY:", req.body, "\n");
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

const activeTypeRooms = [];

// warning: async await s get words mozda bude radio problem!
io.on("connection", async (socket) => {
  const username = socket.handshake.query.username;
  const unfilledRoom = activeTypeRooms.find(
    (room) => room.status === RoomStatus.UNFILLED,
  );
  if (unfilledRoom) {
    unfilledRoom.joinClientToRoom(socket, username);
    if (unfilledRoom.status === RoomStatus.FILLED) {
      io.to(unfilledRoom.roomName).emit("full room", {
        msg: "Get ready",
        usernames: Array.from(unfilledRoom.clientIds.values()),
        words: unfilledRoom.words,
      });
    }
  } else {
    const typeRoom = new TypeRoom();
    await typeRoom.getWords();
    typeRoom.joinClientToRoom(socket, username);
    activeTypeRooms.push(typeRoom);
  }

  socket.on("wpmPosition", (data) => {
    const socketRoom = activeTypeRooms.find((room) =>
      room.clientIds.has(socket.id),
    );
    io.to(socketRoom.roomName).emit("letterPosition", data);
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
