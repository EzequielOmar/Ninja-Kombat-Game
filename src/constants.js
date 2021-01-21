const WorldObject = {
    x: 0,
    y: 0,
    vX: 0,
    vY: 0
}

const CharacterAnimations = {
    idle: "Idle",
    run: "Run",
    jump: "Jump",
    attack: "Attack",
    jumpAttack: "Jump-Attack",
    jumpThrow: "Jump-Throw",
    throw: "Throw",
    dead: "Dead",
    slide: "Slide",
}

const CharacterDirection = {
    left: 1,
    rigth: 0
}

const CharacterJump = {
    floor: 0,
    jumpOne: 1,
    jumpTwo: 2
}

const Character = {
    coordinates: WorldObject,
    mode: CharacterAnimations,
    direction: CharacterDirection,
    jump: CharacterJump
};

const CharacterInitState = {
    character: {
        coordinates:{
            x:window.innerWidth/4,
            y:window.innerHeight / 4,
            vX: 0,
            vY: 0
        },
        mode: CharacterAnimations.idle,
        direction: CharacterDirection.rigth,
        jump: CharacterJump.floor
    }
}

const CharacterState = {
    character: Character
}

const Keys = {
    left : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.A),
    up : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.W),
    rigth : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.D),
    down : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.S),
    attack : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.F),
    throw : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.G)
}

module.exports = {
    WorldObject: WorldObject,
    CharacterAnimations: CharacterAnimations,
    CharacterDirection: CharacterDirection,
    CharacterJump: CharacterJump,
    Character: Character,
    CharacterInitState: CharacterInitState,
    CharacterState: CharacterState,
    Keys: Keys
}