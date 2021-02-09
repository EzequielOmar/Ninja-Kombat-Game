//https://www.gameart2d.com/ninja-adventure---free-sprites.html

import Keyboard from 'pixi.js-keyboard';
import { 
    NinjaAnimations,
    NinjaDirection,
    NinjaJump,
    NinjaInitState
} from './constants';


export class Ninja {
    private _game;
    private _animations;
    private _textures;
    private _currentState;
    private _ninja;
    constructor(game) {
        //fields
        this._game = game;
        this._animations = this._game._resources["ninja"].spritesheet.animations;
        this._textures = this._game._resources["ninja"].textures;
        this._currentState = NinjaInitState;
        
        this._ninja = new PIXI.Container();
        this._ninja.x = this._currentState.coordinates.x;
        this._ninja.y = this._currentState.coordinates.y;
    }
    _manage(){
        if (Keyboard.isKeyPressed('ArrowLeft', 'KeyA'))
            alert("a");
        if (Keyboard.isKeyReleased('ArrowRigth', 'KeyD'))
            alert("d");
        if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
            alert("w");
        
    }
    _update() {
        //console.log(this._currentState);
        // this._currentState = updateState(this._currentState);
        this._manage();
        Keyboard.update();
    }
}