export default function handleSocketConnection(io) {
  const activeTypeRooms = [];

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
}
