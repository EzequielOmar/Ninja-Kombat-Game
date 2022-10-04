const PlayersState = require("../const/players");
const errorMessages = require("../const/messages");

const tickMs = 300;
let player;
let playing = false;
let stateChanged = false;

const maxMemoryUsageForRooms = 0;
let rooms = {};

module.exports = function socketEvents(io, socket) {
  socket.emit("connected");

  socket.on("disconnect", (roomId) => {
    stateChanged = true;
    player = null;
  });

  if (!player) {
    player = PlayersState.PlayersInitState({ x: 980, y: 638 }, socket.id, true);
  }

  socket.on("playerReady", (screenSize) => {
    console.log(screenSize);
    io.sockets.emit("startGame", null);
    _emitStartGame();
  });

  socket.on("stateUpdate", function (playerState) {
    stateChanged = true;
    if (player && player.id === socket.id) player = playerState;
  });

  function _emitStartGame() {
    stateChanged = true;
    _emitStateChangeLoop();
  }

  function _emitStateChangeLoop() {
    playing = true;
    if (stateChanged) {
      stateChanged = false;
      console.log(player);
      io.sockets.emit("stateUpdate", player);
    }
    if (player) setTimeout(() => _emitStateChangeLoop(), tickMs);
    else playing = false;
  }

  //socket.on("disconnect", (roomId) => {
  //  // Remove room on player disconnect
  //  stateChanged = true;
  //  delete rooms[roomId];
  //});
  //
  //socket.on("createRoom", (roomId) => {
  //  let error = null;
  //  let roomExists = io.sockets.adapter.rooms.get(roomId);
  //  //check for room to exists (the other player connected)
  //  if (!roomExists) error = errorMessages.roomNotExists;
  //  //check there is only one player in room
  //  if (roomExists && io.sockets.adapter.rooms.get(roomId).size !== 1)
  //    error = errorMessages.roomFull;
  //  //if error sendit to user, else emit room created correctly to room players
  //  if (error) socket.emit("createRoom", error);
  //  else {
  //    socket.join(roomId);
  //    //save room in memory like an empty array
  //    rooms[roomId] = new Array();
  //    io.sockets.in(roomId).emit("createRoom", null);
  //  }
  //});
  //
  //socket.on("playerReady", (roomId, screenSize) => {
  //  //add player to room array
  //  rooms[roomId].push(
  //    PlayersState.PlayersInitState(screenSize, socket.id, roomId === socket.id)
  //  );
  //  if (/*rooms[roomId].length === 2 &&*/ !playing) _emitStartGame(roomId);
  //});
  //
  //socket.on("stateUpdate", function (roomId, playerState) {
  //  stateChanged = true;
  //  rooms[roomId].map((player) => {
  //    if (player.id === socket.id) {
  //      console.log(player);
  //      player = playerState;
  //    }
  //  });
  //});
  //
  //function _emitStartGame(roomId) {
  //  stateChanged = true;
  //  io.sockets.in(roomId).emit("startGame", null);
  //  _emitStateChangeLoop(roomId);
  //}
  //
  //function _emitStateChangeLoop(roomId) {
  //  playing = true;
  //  // Reduce usage by only send state update if state has changed
  //  if (stateChanged) {
  //    stateChanged = false;
  //    io.sockets.in(roomId).emit("stateUpdate", rooms[roomId]);
  //  }
  //  if (rooms[roomId].length === 2)
  //    setTimeout(() => _emitStateChangeLoop(roomId), tickMs);
  //  // Stop the setTimeout loop if there are no players left
  //  else playing = false;
  //}
};
