class Loader{
	assets: PIXI.Loader;
	private _imagesReady:boolean;
	private _callback;
    constructor(){
        this.assets = new PIXI.Loader();
		this._imagesReady = false;
		this._callback = null;
        this.assets.add("ninja","./assets/ninja/ninja.json");
        this.assets.add("stage1","./assets/stage/stage1.png");
        this.assets.add("stage2","./assets/stage/stage2.png");
        this.assets.add("stage3","./assets/stage/stage3.png");
		//this._assetLoader.onError.add( () => {  } );
		this.assets.onComplete.add( () => { this._onImagesLoaded(); } );
    }
    load( callback ) {
		this.assets.load();
		this._callback = callback;
	}
	_onImagesLoaded(){
		this._imagesReady = true;
		this._callback();
	}
	//***MANEJAR ERROR DE CARGA DE IMAGENES
}

export const loader = new Loader();