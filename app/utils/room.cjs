const { v4: uuid } = require("uuid");
const { RoomStatus } = require("./enums.cjs");
const { getWords } = require("./get-words.cjs");

class TypeRoom {
  constructor() {
    this.status = RoomStatus.UNFILLED;
    this.id = uuid();
    this.roomName = "ROOM: " + this.id;
    this.gameDataMap = new Map();
    this.MAX_SIZE = 2;
    this.clientIds = new Map();
    this.words = null;
  }

  async getWords() {
    this.words = await getWords();
  }

  joinClientToRoom(client, username) {
    if (this.status !== RoomStatus.FILLED) {
      client.join(this.roomName);
      this.gameDataMap.set(client.id, 0);
      this.clientIds.set(client.id, username);
    } else {
      throw new Error("Room Full Error");
    }
    if (this.gameDataMap.size === this.MAX_SIZE) {
      this.status = RoomStatus.FILLED;
    }
  }
}

module.exports = { TypeRoom };
