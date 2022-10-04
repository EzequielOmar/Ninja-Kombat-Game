import { io, Socket } from "socket.io-client";
import { NinjaState } from "../const/ninjaConst";

class SocketConnection {
  socket: Socket;
  constructor() {
    this.socket = io();
  }

  connect() {
    this.socket.emit("connection");
  }

  /**
   * receive the player1 socket id and create a two players private room
   * @param roomId Players 1 socket id
   */
  createRoom(roomId: string) {
    this.socket.emit("createRoom", roomId);
  }

  /**
   * when player confirms his ready, emit screen size to position players
   */
  emitPlayerReady(roomId: string) {
    let screenSize = { x: window.innerWidth, y: window.innerHeight };
    this.socket.emit("playerReady", screenSize);
  }

  emitStateUpdate(roomId: string, state: NinjaState) {
    this.socket.emit("stateUpdate", state);
  }
}

export const socketConnection = new SocketConnection();
