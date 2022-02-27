const playersInitState = require("../const/players");
const errorMessages = require("../const/messages");

const tickMs = 300;
let players = {};
let playing = false;
let stateChanged = false;

module.exports = function socketEvents(io, socket) {
  console.log(socket.id);
  socket.on("disconnect", function () {
    // Remove player from state on disconnect
    stateChanged = true;
    delete players /*[socket.id]*/;
  });

  socket.on("createRoom", (roomId) => {
    let error = "";
    let roomExists = io.sockets.adapter.rooms.get(roomId);
    //check for room to exists (the other player connected)
    if (!roomExists) error = errorMessages.roomNotExists;
    //check there is only one player in room
    if (roomExists && io.sockets.adapter.rooms.get(roomId).size !== 1)
      error = errorMessages.roomFull;
    socket.join(roomId);
    io.sockets.in(roomId).emit("createRoom", error);
  });

  socket.on("playerReady", (roomId, screenSize) => {
    console.log(roomId);
    console.log(socket.id);
    console.log(screenSize);
    //stateChanged = true;
    //players /*[socket.id]*/ = playersInitState(screenSize);
    ////checkear que sean 2 players
    //if (!playing) {
    //  emitStateChangeLoop();
    //}
  });

  socket.on("stateUpdate", function (playerState) {
    stateChanged = true;
    players /*[socket.id]*/ = playerState;
  });

  function emitStateChangeLoop() {
    playing = true;
    // Reduce usage by only send state update if state has changed
    if (stateChanged) {
      stateChanged = false;
      io.emit("stateUpdate", players);
    }
    if (players) {
      setTimeout(emitStateChangeLoop, tickMs);
    } else {
      // Stop the setTimeout loop if there are no players left
      playing = false;
    }
  }
};
