import 'pixi-animationloop';
import { Ninja } from './ninja';


export class Game extends PIXI.utils.EventEmitter {
    private _DOM_container;
    private _stage;
    private _app;
    private _resources;
    private _animationLoop;

    constructor( resources, DOM_container = document.body ){
        //inicialize event emiter
        super();
        //FIELDS
        this._DOM_container = DOM_container;
        this._stage = new PIXI.Container();
        this._app = new PIXI.Application({ 
            width: window.innerWidth, 
            height: window.innerHeight,                       
            antialias: true, 
            transparent: false, 
            resolution: 1
        });
        //this field represent the assets
        this._resources = resources;
        //create a new AnimationLoop class, that will manage the render loop functions
        this._animationLoop = new PIXI.AnimationLoop(this._app.renderer,this._stage);
        //insert the pixi view element in the document.body
		this._DOM_container.appendChild( this._app.renderer.view );
        //start the renderer loop
        this._animationLoop.start();

        let ninja = new Ninja(this);
        this._animationLoop.on('prerender',() => {ninja._update();})
    }
    //***TODA LA LOGICA EN ESTA CLASE - TODO PRIVADO
}