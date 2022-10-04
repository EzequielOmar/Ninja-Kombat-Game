const Scene = {
  floor: window.innerHeight - 110,
  gravity: 5,
};

const Ninja = {
  speed: 5,
  jumpspeed: 2,
  life: 100,
};

enum NinjaMode {
  idle = "Idle",
  run = "Run",
  jump = "Jump",
  attack = "Attack",
  jumpAttack = "Jump-attack",
  jumpThrow = "Jump-throw",
  throw = "Throw",
  dead = "Dead",
  slide = "Slide",
}

enum NinjaDirection {
  left = -1,
  rigth = 1,
}

enum NinjaJump {
  floor = 0,
  one = 1,
  two = 2,
}

interface NinjaState {
  id: string;
  screen: {
    x: number;
    y: number;
  };
  coord: {
    x: number;
    y: number;
  };
  mode: NinjaMode;
  direction: NinjaDirection;
  jump: NinjaJump;
  slide: boolean;
  dead: boolean;
  life: number;
}

enum NinjaKeys {
  left = "KeyA",
  up = "KeyW",
  rigth = "KeyD",
  down = "KeyS",
  attack = "KeyF",
  throw = "KeyG",
}

export {
  Scene,
  Ninja,
  NinjaMode,
  NinjaDirection,
  NinjaJump,
  NinjaState,
  NinjaKeys,
};
