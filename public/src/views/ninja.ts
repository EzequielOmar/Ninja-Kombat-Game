//https://www.gameart2d.com/ninja-adventure---free-sprites.html  -> free ninja assets

import Keyboard from "pixi.js-keyboard";
import {
  NinjaMode,
  //NinjaDirection,
  //NinjaJump,
  NinjaInitState,
  NinjaJump,
  NinjaState,
} from "../const/ninjaConst";
import { update_NinjaState } from "./ninjaState";
import { spriteManager } from "./pixi-spriteManager";
import { socketConnection } from "../socket/socket";

export class Ninja {
  private _game;
  private _stage;
  private _animations;
  private _textures;
  private _ninja;
  private _currentState;
  private _prevState;

  constructor(game) {
    //fields
    this._game = game;
    this._stage = this._game._stage;
    this._animations = this._game._resources["ninja"].spritesheet.animations;
    this._textures = this._game._resources["ninja"].textures;
    this._prevState = null;
    this._ninja = new PIXI.Container();
    this._stage.addChild(this._ninja);

    //    this._currentState = NinjaInitState;
  }

  private _draw() {
    update_NinjaState(this._currentState);
    if (
      this._prevState === null ||
      this._prevState.mode !== this._currentState.mode ||
      this._prevState.direction !== this._currentState.direction
    ) {
      this._ninja.scale.x = this._currentState.direction;
      this._ninja.removeChildren();

      //add new animation mode
      let texture = this._animations[this._currentState.mode];
      let speed = 0.5;
      let loop = true;
      let animation;

      switch (this._currentState.mode) {
        case NinjaMode.idle:
        case NinjaMode.run:
        case NinjaMode.slide:
          animation = spriteManager.AnimatedSprite(texture, speed, loop);
          break;
        case NinjaMode.jump:
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
    this._ninja.x = this._currentState.coordinates.x;
    this._ninja.y = this._currentState.coordinates.y;
  }

  update() {
    if (this._currentState) this._draw();
    Keyboard.update();
    //socketConnection.emitStateUpdate(this._currentState);
  }

  setPlayerState(currentState: NinjaState) {
    this._currentState = currentState;
  }
}
