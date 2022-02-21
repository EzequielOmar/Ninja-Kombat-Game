import "pixi-animationloop";
import { Ninja } from "./ninja";
import { spriteManager } from "./pixi-spriteManager";

export class Game extends PIXI.utils.EventEmitter {
  private _stage: PIXI.Container;
  private _animationLoop: PIXI.AnimationLoop;
  private _resources: any;

  constructor(
    stage: PIXI.Container,
    animationLoop: PIXI.AnimationLoop,
    resources: any
  ) {
    //inicialize event emiter
    super();
    //obtain the stage and the animationLoop from home class
    this._stage = stage;
    this._animationLoop = animationLoop;
    //this field represent the assets
    this._resources = resources;
  }

  start() {
    //create ninja
    let ninja = new Ninja(this);
    this._animationLoop.renderer.on("prerender", () => {
      ninja._update();
    });
  }
}
