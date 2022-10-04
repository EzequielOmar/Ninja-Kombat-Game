import Keyboard from "pixi.js-keyboard";
import {
  Scene,
  Ninja,
  NinjaMode,
  NinjaDirection,
  NinjaJump,
  NinjaState,
  NinjaKeys,
} from "../const/ninjaConst";

const isNinjaMovingX = () =>
  Keyboard.isKeyDown(NinjaKeys.left) || Keyboard.isKeyDown(NinjaKeys.rigth);

const getNinjaMoveDirection = (prevDirection: number) => {
  if (Keyboard.isKeyDown(NinjaKeys.left)) {
    return NinjaDirection.left;
  } else if (Keyboard.isKeyDown(NinjaKeys.rigth)) {
    return NinjaDirection.rigth;
  }
  return prevDirection;
};

const getNinjaVx = (movingX: boolean, moveDirection: number) => {
  return movingX ? moveDirection * Ninja.speed : 0;
};

const isOnTheGround = (prevY: number) => {
  return prevY >= Scene.floor;
};

Keyboard.events.on("pressed_" + NinjaKeys.up, null, (keyCode, event) => {
  console.log(keyCode);
});

const getNinjaJump = (prevJump: number, onTheGround: boolean) => {
  console.log(prevJump);
  console.log(onTheGround);
  if (Keyboard.isKeyDown(NinjaKeys.up)) {
    if (onTheGround && prevJump === NinjaJump.floor) {
      return NinjaJump.one;
    } else if (prevJump === NinjaJump.one) {
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
  jump: number /*,
  onTheGround: boolean*/
) => {
  if (jump !== NinjaJump.floor) {
    return NinjaMode.jump;
    //} else if (jump && Keyboard.isKeyDown(NinjaKeys.up)) {
    //  return NinjaMode.jump;
    //} else if (jump && Keyboard.isKeyDown(NinjaKeys.attack)) {
    //  return NinjaMode.jumpAttack;
    //} else if (jump && Keyboard.isKeyDown(NinjaKeys.throw)) {
    //  return NinjaMode.jumpThrow;
  } else if (Keyboard.isKeyDown(NinjaKeys.attack)) {
    return NinjaMode.attack;
  } else if (Keyboard.isKeyDown(NinjaKeys.throw)) {
    return NinjaMode.throw;
  } else if (movingX && Keyboard.isKeyDown(NinjaKeys.down)) {
    return NinjaMode.slide;
  } else if (movingX) {
    return NinjaMode.run;
  }
  return NinjaMode.idle;
};

const getNinjaVy = (jumping: number, onTheGround: boolean) => {
  if (jumping !== 0) {
    return -Ninja.jumpspeed;
  }
  return onTheGround ? 0 : Scene.gravity;
};

export const update_NinjaState = (currentState: NinjaState) => {
  let state = currentState;
  const movingX = isNinjaMovingX();
  const direction = getNinjaMoveDirection(state.direction);
  const vX = getNinjaVx(movingX, direction);
  const onTheGround = isOnTheGround(state.coord.y);
  const jump = getNinjaJump(state.jump, onTheGround);
  //const jumping = isNinjaJumping(jump);
  const vY = getNinjaVy(jump, onTheGround);
  const mode = getNinjaMode(movingX, jump /*, onTheGround*/);
  state.direction = direction;
  state.jump = jump;
  state.mode = mode;
  state.coord.x += vX;
  state.coord.y += vY;
  return state;
};
