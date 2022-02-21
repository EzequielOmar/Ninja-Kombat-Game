//import PIXI here once, for all the project
import PIXI from "pixi.js";
import { Home } from "./views/home";
/**
import { loader } from "./loader";
import { Game } from "./game";

 * in any point of the process if an exception is throw,
 * this try/catch block will catch that exception, log it, and stop the game.
 try {
     loader.load(
         () => {
             new Game(loader.assets.resources);
            },
            () => {
                throw new Error("no cargo");
            }
            );
        } catch (e) {
            console.log("catch general" + e);
            //***MANEJAR TERMINAR JEGO Y AVISAR USUARio
        }
*/

new Home();
