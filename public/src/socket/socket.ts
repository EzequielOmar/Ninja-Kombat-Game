import { io, Socket } from "socket.io-client";

class SocketConnection {
  private _socket: Socket;
  constructor() {
    this._socket = io();
    this._socket.emit("connection");
  }
}

export const socketConnection = new SocketConnection();
