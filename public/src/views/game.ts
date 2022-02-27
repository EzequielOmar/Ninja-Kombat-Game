import { spriteManager } from "./pixi-spriteManager";
import { Ninja } from "./ninja";
import { socketConnection } from "../socket/socket";

export class Game {
  private _stage: PIXI.Container;
  private _animationLoop: PIXI.AnimationLoop;
  private _resources: any;

  constructor(
    stage: PIXI.Container,
    animationLoop: PIXI.AnimationLoop,
    resources: any
  ) {
    //inicialize event emiter
    //obtain the stage and the animationLoop from home class
    this._stage = stage;
    this._animationLoop = animationLoop;
    //this field represent the assets
    this._resources = resources;
 
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
    //create ninja
    let p1 = new Ninja(this);
    socketConnection.socket.on("stateUpdate", (players) => {
      console.log(players);
      p1.setPlayerState(players);
    });

    this._animationLoop.renderer.on("prerender", () => {
      p1.update();
    });
  }
}
