const AnimationLoop = require('./animationloop');
const Ninja = require('./ninja');

module.exports = class Game extends PIXI.utils.EventEmitter {
    constructor( resources, DOM_containter = document.body ){
        //inicialize event emiter
        super();
        //FIELDS
        this.DOM_containter = DOM_containter;
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
        this._animationLoop = new AnimationLoop(this._app.renderer,this._stage);
        //
        //insert the pixi view element in the document.body
		this.DOM_containter.appendChild( this._app.renderer.view );
        //start the renderer loop
        this._animationLoop.start();


        let ninja = new Ninja(this,100,100,'r');
        this._animationLoop.on('prerender',() => {ninja._update();})
    }
    //***TODA LA LOGICA EN ESTA CLASE - TODO PRIVADO
}