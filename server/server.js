const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const publicPath = path.join(__dirname, "../public/");
const PORT_HTTP = process.env.PORT_HTTP || 8080;
const PORT_SOCKET = process.env.PORT_SOCKET || 3000;
const socketEvents = require("./socket/events");

//setting servers
let app = express();
let httpServer = http.createServer(app);
const io = new socketIO.Server(httpServer);

//serve public static assets
app.use("/", express.static(publicPath));

//On socket connection, use the events files
io.on("connection", (socket) => {
  socketEvents(io, socket);
});

//Start http and socket servers
Promise.all([io.listen(PORT_SOCKET), httpServer.listen(PORT_HTTP)])
  .then(() => {
    console.log("Corriendo");
  })
  .catch((e) => {
    console.log("Error ->" + e);
  });
