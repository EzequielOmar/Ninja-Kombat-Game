const NinjaAnimations = {
    idle: "Idle",
    run: "Run",
    jump: "Jump",
    attack: "Attack",
    jumpAttack: "Jump-attack",
    jumpThrow: "Jump-throw",
    throw: "Throw",
    dead: "Dead",
    slide: "Slide",
}

const NinjaDirection = {
    left: -1,
    rigth: 1
}

const NinjaJump = {
    floor: 0,
    one: 1,
    two: 2
}

const NinjaInitState = {
    coordinates:{
        x:window.innerWidth/4,
        y:window.innerHeight-80 ,
        vX: 0,
        vY: 0
    },
    mode: NinjaAnimations.idle,
    direction: NinjaDirection.rigth,
    jump: NinjaJump.floor,
    //slide: false,
    //dead: false
}

//const Keys = {
//    left : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.A),
//    up : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.W),
//    rigth : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.D),
//    down : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.S),
//    attack : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.F),
//    throw : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.G)
//}

export { NinjaAnimations,
    NinjaDirection,
    NinjaJump,
    NinjaInitState/*,
    Keys*/
}