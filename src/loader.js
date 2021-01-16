class Loader{
    constructor(){
		this._imagesReady = false;
		this._callback = null;
        this._assetLoader = new PIXI.Loader();
        this._assetLoader.add("./assxets/ninja.json");
		this._assetLoader.onError.add( () => {  } );
		this._assetLoader.onComplete.add( () => { this._onImagesLoaded(); } );
    }
    load( callback ) {
		this._assetLoader.load();
		this._callback = callback;
	}
	_onImagesLoaded(){
		this._imagesReady = true;
		this._callback();
	}
	//***MANEJAR ERROR DE CARGA DE IMAGENES
}

module.exports = new Loader();