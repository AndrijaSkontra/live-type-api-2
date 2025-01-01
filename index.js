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

io.on("connection", (socket) => {
  console.log("CONNECTING NEW CLIENT");
  const unfilledRoom = activeTypeRooms.find(
    (room) => room.status === RoomStatus.UNFILLED,
  );
  if (unfilledRoom) {
    unfilledRoom.joinClientToRoom(socket);
  } else {
    const typeRoom = new TypeRoom();
    typeRoom.joinClientToRoom(socket);
    activeTypeRooms.push(typeRoom);
  }
  console.log(socket.rooms);

  socket.on("event2", (data) => {
    // provjeri koji socket je ovo poslao socket.id odnosno find room kojem pripada ovaj socket
    const socketRoom = activeTypeRooms.find((room) =>
      room.clientIds.includes(socket.id),
    );
    console.log("emiting to room name: ", socketRoom.roomName);
    // TODO: ova socket logika radi, refactor imena i kreni raditi na frontendu.
    io.to(socketRoom.roomName).emit(
      "letter",
      `position of ${socket.id} from ${socketRoom.roomName}, data: ${data}`,
    );
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
