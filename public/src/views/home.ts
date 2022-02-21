import "pixi-animationloop";
import { spriteManager } from "../pixi-spriteManager";
import { loader } from "../loader";
import { messages } from "../const/messages";
import { Game } from "../game";
import { socketConnection } from "../socket/socket";

export class Home {
  //graphic management
  private _app: PIXI.Application;
  private _animationLoop: PIXI.AnimationLoop;
  private _stage: PIXI.Container;
  private _game: Game;
  //messages
  private _error: string = "";
  //Dom Elements
  private _DOM_container: HTMLElement;
  private _$div_lobby: HTMLElement;
  private _$btn_start_room: HTMLElement;
  private _$div_copy_url: HTMLElement;
  private _$div_confirm: HTMLElement;
  private _$div_error: HTMLElement;

  constructor(DOM_container = document.body) {
    this._DOM_container = DOM_container;
    this._stage = new PIXI.Container();
    this._app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      transparent: false,
      resolution: 1,
      resizeTo: window,
    });

    //connect socket
    socketConnection;

    //get lobby elements from DOM
    this._$div_lobby = document.getElementById("lobby");
    this._$btn_start_room = document.getElementById("start-room");
    this._$div_copy_url = document.getElementById("copy-room-url");
    this._$div_confirm = document.getElementById("confirm");
    this._$div_error = document.getElementById("error");
    //add events to window
    this._addWindowEvents();
    //init assets load
    this._loadAssets();
  }

  private _addWindowEvents() {
    //assets load complete
    window.addEventListener("assetsLoadSucces", () => {
      this._onAssetsLoadSucces();
    });
    //assets load error
    window.addEventListener("assetsLoadError", () => {
      this._onError(messages.errorLoadingAssets);
    });
    //window resize (redraw all)
    window.addEventListener("resize", () => {
      this._drawStage();
    });
  }

  private _loadAssets() {
    loader.load(
      () => window.dispatchEvent(new Event("assetsLoadSucces")),
      () => window.dispatchEvent(new Event("assetsLoadError"))
    );
  }

  private _onAssetsLoadSucces() {
    this._prepareStage();
    this._drawStage();
    this._createGame();
    this._showCreateRoom();
  }

  private _onError(errorMessages: string) {
    this._error = errorMessages;
    /*
    
    make app stop and show error
    
    */
  }

  private _prepareStage() {
    //create a new AnimationLoop class, that will manage the render loop functions
    this._animationLoop = new PIXI.AnimationLoop(
      this._app.renderer,
      this._stage
    );
    //insert the pixi view element in the document.body
    this._DOM_container.appendChild(this._app.renderer.view);
    //start the renderer loop
    this._animationLoop.start();
  }

  private _drawStage() {
    this._stage.removeChildren();
    this._stage.addChild(
      spriteManager.Sprite(loader.assets.resources["stage1"].texture)
    );
    this._stage.addChild(
      spriteManager.Sprite(loader.assets.resources["stage2"].texture)
    );
    this._stage.addChild(
      spriteManager.Sprite(loader.assets.resources["stage3"].texture)
    );
  }

  private _createGame() {
    this._game = new Game(
      this._stage,
      this._animationLoop,
      loader.assets.resources
    );
  }

  private _showCreateRoom() {
    this._$btn_start_room.style.display = "block";
    this._$btn_start_room.addEventListener("click", () => {
      this._$div_lobby.style.display = "none";
      this._game.start();
    });
  }
}
