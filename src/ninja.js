require('pixi-keyboard');

//const fields
const HEALTH = 100,
    SPEED = 10,
    range = 185,
    damage = 1,
kills= 0;

const keys = {
    left : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.A),
    up : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.W),
    rigth : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.D),
    down : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.S),
    attack : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.F),
    throw : PIXI.keyboardManager.getHotKey(PIXI.keyboard.Key.G)
}

module.exports = class Ninja{
    constructor(game,x,y,facing){
        //fields
        this._game = game;
        this._animations = {};
        this._ninjaAssets = this._game._resources["./assets/ninja.json"].spritesheet.animations;
        this._textures = this._game._resources["./assets/ninja.json"].textures;
        this._ninja = new PIXI.Container();
        
        this._facing = facing;
        this._health = HEALTH;
        this._runleft = false;
        this._runright = false;
        this._jump = false;
        this._ground = false;
        this._slide = false;
        this._attack = false;
        this._dead= false;
        this._vx = 0;
        this._vy = 0;

        this._animations["idle"] = new PIXI.AnimatedSprite(this._ninjaAssets["Idle"]);
        //idle.animationSpeed= 0.2;
        this._animations["run"] = new PIXI.AnimatedSprite(this._ninjaAssets["Run"]);
        //run.animationSpeed= 0.6;
        this._animations["jump"] = new PIXI.AnimatedSprite(this._ninjaAssets["Jump"]);
        //jump.animationSpeed= 0.2;
        this._animations["attack"] = new PIXI.AnimatedSprite(this._ninjaAssets["Attack"]);
        //attack.animationSpeed= 0.5;
        this._animations["jump-attack"] = new PIXI.AnimatedSprite(this._ninjaAssets["Jump-attack"]);
        //jumpattack.animationSpeed= 0.5;
        this._animations["jump-throw"] = new PIXI.AnimatedSprite(this._ninjaAssets["Jump-throw"]);
        //jumpthrow.animationSpeed= 0.5;
        this._animations["throw"] = new PIXI.AnimatedSprite(this._ninjaAssets["Throw"]);
        //throw.animationSpeed= 0.5;
        this._animations["dead"] = new PIXI.AnimatedSprite(this._ninjaAssets["Dead"]);
        //dead.animationSpeed= 0.2;
        this._animations["slide"] = new PIXI.AnimatedSprite(this._ninjaAssets["Slide"]);
        //slide.animationSpeed= 0.6;

        //kunai
        this._kunai = new PIXI.Sprite(this._textures["Kunai"]);
        this._kunai.visible = true;
        this._kunai.scale.y*=-1;
        this._kunai.pivot.x=16;
        this._kunai.pivot.y=80;

        this._ninja.position.x = x;
        this._ninja.position.y = y;
        this._ninja.addChild(this._animations["idle"]);

        this._game._stage.addChild(this._ninja);
        this._game._stage.addChild(this._kunai);

        
    }
    _movePlayers(){
        if(keys["left"]){
            this._vx = -SPEED;
        }
        this._ninja.position.x += this._vx;
        this._ninja.position.y += this._vy;
    }
    _manageAnimation(){
        /**
         * Play and manage animations
         * of bolth players on key events.
         */
        //idle
        if(this._vx == 0 && this._ground){
            this._ninja.removeChildren();
            this._ninja.addChild(this._animations["idle"]);
            this._animations["idle"].play();
            this._ninja.pivot.x = this._animations["idle"].width/2;
        }
        //run left
        if(this._runleft && this._vx<0){
            if(this._ninja.scale.x == 1){
                this._ninja.scale.x*=-1;
            }
            this._ninja.removeChildren();
            this._ninja.addChild(this._animations["run"]);
            this._animations["run"].play();
            this._ninja.pivot.x = this._animations["run"].width/2;
        }
        //run right
        if(this._runright && this._vx>0){
            if(this._ninja.scale.x == -1){
                this._ninja.scale.x*=-1;
            }
            this._ninja.removeChildren();
            this._ninja.addChild(this._animations["run"]);
            this._animations["run"].play();
            this._ninja.pivot.x = this._animations["run"].width/2;
        }
        //jump
        if(!this._ground && this._jump){
            this._ninja.removeChildren();
            this._ninja.addChild(this._animations["jump"]);
            this._animations["jump"].play();
            this._ninja.pivot.x = this._animations["jump"].width/2;
        }
        //slide
        if(this._slide){
            this._ninja.removeChildren();
            this._ninja.addChild(this._animations["slide"]);
            this._animations["slide"].y=100;    
            this._animations["slide"].play();
            this._ninja.pivot.x = this._animations["slide"].width/2;
        }
        //atack
        if(this._attack){
            if(this._ground && !this._jump){
                this._ninja.removeChildren();
                this._ninja.addChild(this._animations["attack"]);
                this._animations["attack"].play();
                this._ninja.pivot.x = this._animations["attack"].width/2;
            }
            if(!this._ground && this._jump){
                this._ninja.removeChildren();
                this._ninja.addChild(this._animations["jump-attack"]);
                this._animations["jump-attack"].play();
                this._ninja.pivot.x = this._animations["jump-attack"].width/2;
            }
        }
        //throw
        if(this._throw){
            if(this._ground && !this._jump){
                this._ninja.removeChildren();
                this._ninja.addChild(this._animations["throw"]);
                this._animations["throw"].play();
                this._ninja.pivot.x = this._animations["throw"].width/2;
            }
            if(!this._ground && this._jump){
                this._ninja.removeChildren();
                this._ninja.addChild(this._animations["jump-throw"]);
                this._animations["jump-throw"].play();
                this._ninja.pivot.x = this._animations["jump-throw"].width/2;
            }
        }
        //gravity floor check
        if (this._ninja.y>=100){
            this._ground=true; 
            this._animations["jump"]=false;   
            this._ninja.position.y=100;
        }else{
            if(this._ninja.position.y<100){
                this._ground = false;
                this._vy += this._gravity;
            }
        }
        //kunai
        if(this._kunai.visible){
            this._kunai.x += this._kunai.vx;
            this._kunai.rotation += .5;
            this._ninja.addChild(this._kunai);
        }
        if(this._kunai.x < 0 || this._kunai.x > 1050){
            this._kunai.visible=false;
        }
        //Dead
        if(this._health<=0){
            this._ninja.removeChildren();
            this._ninja.addChild(this._animations["dead"]);
            this._dead.play();
            this._ninja.pivot.x = this._animations["dead"].width/2;
        }
    }
    _manageKeys(){
        if(keys.up.isPressed){
            alert("asd");
        }
    }

    _update(){
        //this._movePlayers();
        //this._manageAnimation();
        this._manageKeys();
        PIXI.keyboardManager.update()
    }
}