import PIXI from "pixi.js";
import { loader } from './loader';
import { Game } from './game';


/**
 * in any point of the process if an exception is throw,
 * this try/catch block will catch that exception, log it, and stop the game.
*/
try{
    loader.load(() => { new Game(loader.assets.resources); })
}catch(e){
    console.log(e);
    //***MANEJAR TERMINAR JEGO Y AVISAR USUARio
}