//https://www.gameart2d.com/ninja-adventure---free-sprites.html
require('pixi-keyboard');
let constants = require('./constants');


module.exports = class Ninja{
    constructor(game){
        //fields
        this._game = game;
        this._ninjaAssets = this._game._resources["ninja"].spritesheet;
        this._textures = this._game._resources["ninja"].textures;
        this._ninja = new PIXI.Container();
        
        //this._animations = {};
        //this._facing = facing;
        //this._health = HEALTH;
        //this._runleft = false;
        //this._runright = false;
        //this._jump = false;
        //this._ground = false;
        //this._slide = false;
        //this._attack = false;
        //this._dead= false;
        //this._vx = 0;
        //this._vy = 0;

        this._characterState = constants.CharacterInitState;
        console.log(this._characterState);

        //this._animations["idle"] = new PIXI.AnimatedSprite(this._ninjaAssets["Idle"]);
        ////idle.animationSpeed= 0.2;
        //this._animations["run"] = new PIXI.AnimatedSprite(this._ninjaAssets["Run"]);
        ////run.animationSpeed= 0.6;
        //this._animations["jump"] = new PIXI.AnimatedSprite(this._ninjaAssets["Jump"]);
        ////jump.animationSpeed= 0.2;
        //this._animations["attack"] = new PIXI.AnimatedSprite(this._ninjaAssets["Attack"]);
        ////attack.animationSpeed= 0.5;
        //this._animations["jump-attack"] = new PIXI.AnimatedSprite(this._ninjaAssets["Jump-attack"]);
        ////jumpattack.animationSpeed= 0.5;
        //this._animations["jump-throw"] = new PIXI.AnimatedSprite(this._ninjaAssets["Jump-throw"]);
        ////jumpthrow.animationSpeed= 0.5;
        //this._animations["throw"] = new PIXI.AnimatedSprite(this._ninjaAssets["Throw"]);
        ////throw.animationSpeed= 0.5;
        //this._animations["dead"] = new PIXI.AnimatedSprite(this._ninjaAssets["Dead"]);
        ////dead.animationSpeed= 0.2;
        //this._animations["slide"] = new PIXI.AnimatedSprite(this._ninjaAssets["Slide"]);
        ////slide.animationSpeed= 0.6;
        ////kunai
        //this._kunai = new PIXI.Sprite(this._textures["Kunai"]);
        //this._kunai.visible = true;
        //this._kunai.scale.y*=-1;
        //this._kunai.pivot.x=16;
        //this._kunai.pivot.y=80;
        //this._ninja.position.x = x;
        //this._ninja.position.y = y;
        //this._ninja.addChild(this._animations["idle"]);
        //
        //this._animations["idle"].tint = Math.random() * 0xFFFFFF;
        //this._game._stage.addChild(this._ninja);
        //this._game._stage.addChild(this._kunai);


        
    }
 
    _manageKeys(){
        if(constants.Keys.up.isPressed){
            alert("asd");
        }
    }

    _update(){
        this._manageKeys();
        PIXI.keyboardManager.update()
    }
}