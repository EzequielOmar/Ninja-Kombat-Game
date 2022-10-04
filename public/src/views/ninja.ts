//https://www.gameart2d.com/ninja-adventure---free-sprites.html  -> free ninja assets

import Keyboard from "pixi.js-keyboard";
import {
  NinjaMode,
  //NinjaDirection,
  //NinjaJump,
  NinjaJump,
  NinjaState,
} from "../const/ninjaConst";
import { update_NinjaState } from "./ninjaState";
import { spriteManager } from "./pixi-spriteManager";
import { socketConnection } from "../socket/socket";

export class Ninja {
  private _stage: PIXI.Container;
  private _animations: any;
  private _ninja: PIXI.Container;
  private _prevState: NinjaState;
  private _roomId: string;
  private _currentState: NinjaState;
  id: string;

  constructor(
    stage: PIXI.Container,
    resources: any,
    initState: NinjaState,
    id: string,
    roomId: string
  ) {
    //fields
    this._stage = stage;
    this._animations = resources["ninja"].spritesheet.animations;
    this._ninja = new PIXI.Container();
    this._prevState = null;
    this._currentState = initState;
    this.id = id;
    this._roomId = roomId;

    console.log(this.id === this._roomId);
    //set tint

    this._stage.addChild(this._ninja);
  }

  drawCurrentState() {
    if (
      this._prevState === null ||
      this._prevState.mode !== this._currentState.mode ||
      this._prevState.direction !== this._currentState.direction
    ) {
      this._ninja.scale.x = this._currentState.direction;
      //add new animation mode
      let texture = this._animations[this._currentState.mode];
      let speed = 0.5;
      let loop = true;
      let animation: any;
      this._ninja.removeChildren();
      console.log(this._currentState.mode);
      switch (this._currentState.mode) {
        case NinjaMode.idle:
        case NinjaMode.run:
        case NinjaMode.slide:
        case NinjaMode.attack:
        case NinjaMode.throw:
          animation = spriteManager.AnimatedSprite(texture, speed, loop);
          break;
        case NinjaMode.jump:
        case NinjaMode.jumpAttack:
        case NinjaMode.jumpThrow:
          loop = false;
          animation = spriteManager.AnimatedSprite(texture, speed, loop);
          animation.onComplete = () => {
            this._currentState.jump = NinjaJump.floor;
          };
          break;
      }
      this._ninja.addChild(animation);
      this._prevState = JSON.parse(JSON.stringify(this._currentState));
    }
    this._ninja.x = this._currentState.coord.x;
    this._ninja.y = this._currentState.coord.y;
  }

  castMotions() {
    Keyboard.update();
    this._currentState = update_NinjaState(this._currentState);
    socketConnection.emitStateUpdate(this._roomId, this._currentState);
  }

  setCurrentState(_currentState: NinjaState) {
    if (JSON.stringify(this._currentState) !== JSON.stringify(_currentState))
      this._currentState = _currentState;
  }
}
