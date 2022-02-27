import Keyboard from 'pixi.js-keyboard';
import {
  Scene,
  Ninja,
  NinjaMode,
  NinjaDirection,
  NinjaJump,
  NinjaInitState,
  NinjaState,
  NinjaKeys
} from "../const/ninjaConst";

import { socketConnection } from "../socket/socket";

const isNinjaMovingX = () => 
  Keyboard.isKeyDown(NinjaKeys.left) || Keyboard.isKeyDown(NinjaKeys.rigth);

const getNinjaMoveDirection = (prevDirection: number) => {
  if (Keyboard.isKeyDown(NinjaKeys.left)) {
    return NinjaDirection.left;
  } else if (Keyboard.isKeyDown(NinjaKeys.rigth)) {
    return NinjaDirection.rigth;
  }
  return prevDirection;
}

const getNinjaVx = (movingX: boolean, moveDirection: number) => {
  return movingX ? moveDirection * Ninja.speed : 0;
};

const isOnTheGround = (prevY: number) => {
  return prevY >= Scene.floor;
};

const getNinjaJump = (
  prevJump: number,
  onTheGround: boolean
) => 
{
  if(Keyboard.isKeyPressed(NinjaKeys.up)){
    if(onTheGround){
      return NinjaJump.one;
    } else if (prevJump > NinjaJump.floor && prevJump < NinjaJump.two) {
      return NinjaJump.two;
    }
  }
  return prevJump;
};

const isNinjaJumping = (jump: number) => {
  return jump > 0;
};

const getNinjaMode = (
  movingX: boolean,
  jump: boolean/*,
  onTheGround: boolean*/
) => {
  if (jump) {
    return NinjaMode.jump;
  }/*else if(jump && Keyboard.isKeyPressed(NinjaKeys.attack)){
    return NinjaMode.jumpAttack;
  } else if(Keyboard.isKeyPressed(NinjaKeys.attack)){
    return NinjaMode.attack;
  }*/ else if(movingX && Keyboard.isKeyDown(NinjaKeys.down)){
    return NinjaMode.slide;
  } else if (movingX) {
    return NinjaMode.run;
  }
  return NinjaMode.idle;
};

const getNinjaVy = (jumping: boolean, onTheGround: boolean) => {
  if (jumping) {
    return -Ninja.jumpspeed;
  }
  return onTheGround ? 0 : Scene.gravity;
};

export const update_NinjaState = (state: NinjaState) => {
  const movingX = isNinjaMovingX();
  const direction = getNinjaMoveDirection(state.direction);
  const vX = getNinjaVx(movingX, direction);
  const onTheGround = isOnTheGround(state.coordinates.y);
  const jump = getNinjaJump(state.jump, onTheGround);
  const jumping = isNinjaJumping(jump);
  const vY = getNinjaVy(jumping, onTheGround);
  const mode = getNinjaMode(movingX, jumping/*, onTheGround*/);
  state.direction = direction;
  state.jump = jump;
  state.mode = mode;
  state.coordinates.x += vX;
  state.coordinates.y += vY;
  socketConnection.emitStateUpdate(state);
  //return state; 
}