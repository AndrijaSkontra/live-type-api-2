import { v4 as uuid } from "uuid";
import { RoomStatus } from "./enums.js";
import { getWords } from "./get-words.js";

export class TypeRoom {
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
      console.log("INSIDE id and username", client.id, username);
      this.clientIds.set(client.id, username);
    } else {
      throw new Error("Room Full Error");
    }
    console.log("debug: ", this.gameDataMap.size, this.MAX_SIZE);
    if (this.gameDataMap.size === this.MAX_SIZE) {
      this.status = RoomStatus.FILLED;
    }
    console.log("Room status: ", this.status);
  }
}
