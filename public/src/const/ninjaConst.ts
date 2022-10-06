const Scene = {
  floor: window.innerHeight - 110,
  gravity: 5,
};

const NinjaConstants = {
  animation_speed: 0.5,
  coord_speed: 5,
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

interface NinjaState {
  id: string;
  coord: {
    x: number;
    y: number;
  };
  mode: NinjaMode;
  direction: NinjaDirection;
  jump: boolean;
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
  NinjaConstants,
  NinjaMode,
  NinjaDirection,
  NinjaState,
  NinjaKeys,
};
