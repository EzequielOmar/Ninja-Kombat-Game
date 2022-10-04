import "pixi-animationloop";
import { spriteManager } from "./pixi-spriteManager";
import { loader } from "../loader/loader";
import { messages } from "../const/messages";
import { Game } from "./game";
import { lobby } from "./lobby";
import { socketConnection } from "../socket/socket";

export class App {
  //graphic management
  private _app: PIXI.Application;
  private _animationLoop: PIXI.AnimationLoop;
  private _stage: PIXI.Container;
  game: Game;
  //roomId: string;
  //body html element
  private _DOM_container: HTMLElement;

  constructor() {
    this._DOM_container = document.body;
    this._stage = new PIXI.Container();
    this._app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      transparent: false,
      resolution: 1,
      resizeTo: window,
    });
    //prepare stage, animation loop, and game class
    this._prepareScreen();
  }

  loadAssets() {
    loader.load();
  }

  onError(errorMessages: string) {
    lobby.displayError(errorMessages);
  }

  displayLobby() {
    this.game.setRoomId();
    if (this.game.roomId === socketConnection.socket.id)
      lobby.displayWaitingRoom(window.location.href);
    else socketConnection.createRoom(this.game.roomId);
  }
  
  fullRoom() {
    lobby.displayFullRoom();
  }

  private _prepareScreen() {
    //create a new AnimationLoop class, that will manage the render loop functions
    this._animationLoop = new PIXI.AnimationLoop(
      this._app.renderer,
      this._stage
    );
    //insert the pixi view element in the document.body
    this._DOM_container.appendChild(this._app.renderer.view);
    //start the renderer loop
    this._animationLoop.start();
    //create the game class, it handles the game logic
    this.game = new Game(
      this._stage,
      this._animationLoop,
      loader.assets.resources
    );
  }
}
