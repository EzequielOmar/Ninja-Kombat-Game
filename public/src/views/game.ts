import { spriteManager } from "./pixi-spriteManager";
import { Ninja } from "./ninja";
import { socketConnection } from "../socket/socket";
import { NinjaState } from "../const/ninjaConst";

export class Game {
  private _stage: PIXI.Container;
  private _animationLoop: PIXI.AnimationLoop;
  private _resources: any;
  private _players: Ninja[];
  roomId: string;

  constructor(
    stage: PIXI.Container,
    animationLoop: PIXI.AnimationLoop,
    resources: any
  ) {
    //obtain the stage and the animationLoop from home class
    this._stage = stage;
    this._animationLoop = animationLoop;
    //this field represent the assets
    this._resources = resources;
    this._players = [];
  }

  setRoomId(): void {
    this.roomId = new URLSearchParams(window.location.search).get("roomId");
    if (!this.roomId) {
      window.history.pushState(
        "",
        "",
        "/?roomId=" + socketConnection.socket.id
      );
      this.roomId = socketConnection.socket.id;
    }
  }

  drawStage() {
    this._stage.removeChildren();
    this._stage.addChild(
      spriteManager.Sprite(this._resources["stage1"].texture)
    );
    this._stage.addChild(
      spriteManager.Sprite(this._resources["stage2"].texture)
    );
    this._stage.addChild(
      spriteManager.Sprite(this._resources["stage3"].texture)
    );
  }

  start() {
    socketConnection.socket.on("stateUpdate", (playerState: NinjaState) => {
      //create players (just the first time)
      if (this._players.length === 0) {
        //playersState.forEach((playerState: NinjaState) => {
        this._players.push(
          new Ninja(
            this._stage,
            this._resources,
            playerState,
            playerState.id,
            "asd"
          )
        );
        //});
      }
      //set state
      //playersState.forEach((playerState: NinjaState) => {
      this._players.map((player: Ninja) => {
        if (player.id === playerState.id) player.setCurrentState(playerState);
      });
      //});
    });

    this._animationLoop.renderer.on("prerender", () => {
      //update state (tick)
      this._players.forEach((player: Ninja) => {
        if (socketConnection.socket.id === player.id) player.castMotions();
        player.drawCurrentState();
      });
    });
  }
}

/*
      console.log(players);
      if (!Object.keys(this._players).length) {
        Object.keys(players).forEach((id: string) => {
          this._players[id] = new Ninja(
            this._stage,
            this._resources,
            players[id],
            socketConnection.socket.id === id,
            this._roomId
            );
          });
        }
        Object.keys(this._players).forEach((id: string) => {
          this._players[id].setPlayerState(players[id]);
        });
        
        
        
         Object.keys(this._players).forEach((id: string) => {
           //only if the character belongs to client, cast movements to server
           if (socketConnection.socket.id === id) this._players[id].castMotions();
           this._players[id].drawCurrentState();
         });
        */
