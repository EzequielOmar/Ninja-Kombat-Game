//https://www.gameart2d.com/ninja-adventure---free-sprites.html  -> free ninja assets
import Keyboard from "pixi.js-keyboard";
import {
  Scene,
  NinjaConstants,
  NinjaMode,
  NinjaDirection,
  NinjaState,
  NinjaKeys,
} from "../const/ninjaConst";

export class Ninja {
  private _stage: PIXI.Container;
  private _animations: any;
  private _ninjaContainer: PIXI.Container;
  private _prevState: NinjaState;
  private _currentState: NinjaState;
  private _isHost: Boolean;
  id: string;

  constructor(
    stage: PIXI.Container,
    resources: any,
    isHost: Boolean,
    id: string
  ) {
    //fields
    this._stage = stage;
    this._animations = resources["ninja"].spritesheet.animations;
    this._ninjaContainer = new PIXI.Container();
    this._prevState = null;
    this._isHost = isHost;
    this.id = id;
    //TODO set tint
    //* Adding ninja to stage
    this._stage.addChild(this._ninjaContainer);
  }

  get currentState() {
    return this._currentState;
  }

  set currentState(_currentState: NinjaState) {
    if (JSON.stringify(this._currentState) !== JSON.stringify(_currentState))
      this._currentState = _currentState;
  }

  drawCurrentState() {
    if (this._animationHasChanged()) {
      this._changeAnimation();
      //* Set the current state as old once drawed
      this._prevState = JSON.parse(JSON.stringify(this._currentState));
    }
    this._place();
  }

  castMotions() {
    Keyboard.update();
    this._update_NinjaState();
  }

  //Private
  private _animationHasChanged() {
    return (
      this._prevState === null ||
      this._prevState.mode !== this._currentState.mode ||
      this._prevState.direction !== this._currentState.direction
    );
  }

  private _changeAnimation() {
    //* Skew X direction
    this._ninjaContainer.scale.x = this._currentState.direction;
    this._ninjaContainer.removeChildren();
    let animation = new PIXI.AnimatedSprite(
      this._animations[this._currentState.mode]
    );
    //* Jump must be played once
    animation.loop = this._currentState.jump ? false : true;
    animation.animationSpeed = NinjaConstants.animation_speed;
    animation.pivot.y = animation.height;
    animation.pivot.x = animation.width / 2;
    animation.play();
    //* On jump animation finished, end jump
    if (this._currentState.mode === NinjaMode.jump)
      animation.onComplete = () => (this._currentState.jump = false);
    this._ninjaContainer.addChild(animation);
  }

  private _place() {
    this._ninjaContainer.x = this._currentState.coord.x;
    this._ninjaContainer.y = this._currentState.coord.y;
  }

  private _update_NinjaState() {
    let state = this._currentState;
    const movingX = this._isNinjaMovingX();
    const onTheGround = this._isOnTheGround(state.coord.y);
    state.direction = this._getNinjaMoveDirection(state.direction);
    state.jump = this._getNinjaJump(state.jump, onTheGround);
    state.mode = this._getNinjaMode(movingX, state.jump);
    state.coord.x += this._getNinjaVx(movingX, state.direction);
    state.coord.y += this._getNinjaVy(state.jump, onTheGround);
    this._setLimits();
    this._currentState = state;
  }

  private _isNinjaMovingX = () =>
    Keyboard.isKeyDown(NinjaKeys.left) || Keyboard.isKeyDown(NinjaKeys.rigth);

  private _getNinjaMoveDirection = (prevDirection: number) => {
    if (Keyboard.isKeyDown(NinjaKeys.left)) return NinjaDirection.left;
    else if (Keyboard.isKeyDown(NinjaKeys.rigth)) return NinjaDirection.rigth;
    return prevDirection;
  };

  private _getNinjaVx = (movingX: boolean, moveDirection: number) =>
    movingX ? moveDirection * NinjaConstants.coord_speed : 0;

  private _isOnTheGround = (prevY: number) => prevY >= Scene.floor;

  private _getNinjaJump = (prevJump: boolean, onTheGround: boolean) => {
    if (Keyboard.isKeyDown(NinjaKeys.up) && onTheGround && !prevJump)
      return true;
    return prevJump;
  };

  private _getNinjaVy = (jumping: boolean, onTheGround: boolean) =>
    jumping ? -NinjaConstants.jumpspeed : onTheGround ? 0 : Scene.gravity;

  private _getNinjaMode = (movingX: boolean, jump: boolean) => {
    if (jump && Keyboard.isKeyDown(NinjaKeys.attack))
      return NinjaMode.jumpAttack;
    else if (jump && Keyboard.isKeyDown(NinjaKeys.throw))
      return NinjaMode.jumpThrow;
    else if (jump) return NinjaMode.jump;
    else if (Keyboard.isKeyDown(NinjaKeys.attack)) return NinjaMode.attack;
    else if (Keyboard.isKeyDown(NinjaKeys.throw)) return NinjaMode.throw;
    else if (movingX && Keyboard.isKeyDown(NinjaKeys.down))
      return NinjaMode.slide;
    else if (movingX) return NinjaMode.run;
    return NinjaMode.idle;
  };

  private _setLimits = () => {
    //TODO displace character images width and heigth
    if (this._currentState.coord.x >= window.innerWidth)
      this._currentState.coord.x = window.innerWidth;
    if (this._currentState.coord.x <= 0) this._currentState.coord.x = 0;
    if (this._currentState.coord.y <= 0) this._currentState.coord.y = 0;
  };
}
