class Loader{
    constructor(){
		this._imagesReady = false;
        this._callback = null;
        this._assetLoader = new PIXI.Loader();
        this._assetLoader.add("./assets/ninja.json");
		//this._assetLoader.onError.add( () => { throw "Error al cargar las imagenes" } );
		this._assetLoader.onComplete.add( () => { this._imagesReady = true; } );
    }
    load() {
		try{
			this._assetLoader.load();
		}catch(e){
			throw e;
		}
	}
}

module.exports = new Loader();