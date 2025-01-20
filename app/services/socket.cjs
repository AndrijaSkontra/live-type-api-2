const { TypeRoom } = require("../utils/room.cjs");
const { RoomStatus } = require("../utils/enums.cjs");

function handleSocketConnection(io) {
  const activeTypeRooms = [];

  io.on("connection", async (socket) => {
    // playerId can be a jwt token or a random guest username
    const playerId = socket.handshake.query.jwt;
    console.log("con: ", playerId);
    const unfilledRoom = activeTypeRooms.find(
      (room) => room.status === RoomStatus.UNFILLED,
    );
    if (unfilledRoom) {
      if (!doesPlayerExistInTheRoomAlready(playerId, unfilledRoom)) {
        console.log(!doesPlayerExistInTheRoomAlready(playerId, unfilledRoom));
        unfilledRoom.joinClientToRoom(socket, playerId);
        if (unfilledRoom.status === RoomStatus.FILLED) {
          io.to(unfilledRoom.roomName).emit("full room", {
            msg: "Get ready",
            usernames: Array.from(unfilledRoom.clientIds.values()),
            words: unfilledRoom.words,
          });
        }
      }
    } else {
      const typeRoom = new TypeRoom();
      await typeRoom.getWords();
      typeRoom.joinClientToRoom(socket, playerId);
      activeTypeRooms.push(typeRoom);
    }

    socket.on("wpmPosition", (data) => {
      const socketRoom = activeTypeRooms.find((room) =>
        room.clientIds.has(socket.id),
      );
      io.to(socketRoom.roomName).emit("letterPosition", data);
    });
  });
}

function doesPlayerExistInTheRoomAlready(playerId, unfilledRoom) {
  const mapInTheRoom = unfilledRoom.clientIds;
  const roomUsernameIds = Array.from(mapInTheRoom.values());
  console.log(roomUsernameIds, playerId);
  if (roomUsernameIds.some((username) => username === playerId)) {
    return true;
  } else {
    return false;
  }
}

module.exports = handleSocketConnection;
