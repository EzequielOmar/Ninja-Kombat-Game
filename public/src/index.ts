//import PIXI package here once, for all the project
import PIXI from "pixi.js";
import { messages } from "./const/messages";
import { socketConnection } from "./socket/socket";
import { App } from "./views/app";
import { lobby } from "./views/lobby";

//connect socket

socketConnection.connect();

let roomId = null;

/**
 * This class handle all the app flow, game loop,
 * socket connection, asset load, DOM, and errors.
 */
let app = new App();

/*Add window event listeners*/

//on assets load complete, show lobby
window.addEventListener("assetsLoadSucces", () => {
  app.game.drawStage();
});

//on assets load error, show error
window.addEventListener("assetsLoadError", () => {
  app.onError(messages.errorLoadingAssets);
});

//on window resize, redraw stage
window.addEventListener("resize", () => {
  app.game.drawStage();
});

socketConnection.socket.on("connected", function () {
  app.fullRoom();
  //lobby.hideAll();
  //app.game.start();
});

lobby.$btn_full_room.addEventListener("click", () => {
  socketConnection.emitPlayerReady(app.game.roomId);
});

socketConnection.socket.on("createRoom", (error) => {
  if (error) app.onError(error);
  else app.fullRoom();
});

socketConnection.socket.on("startGame", () => {
  lobby.hideAll();
  app.game.start();
});

//start assets load
app.loadAssets();
