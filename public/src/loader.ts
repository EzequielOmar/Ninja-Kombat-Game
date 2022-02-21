import { messages } from "./const/messages";

class Loader {
  assets: PIXI.Loader;
  private _succesCallback: any;
  private _errorCallback: any;
  private _errors: number;
  private _$div_load: HTMLElement;

  constructor() {
    this.assets = new PIXI.Loader();
    //get loading div from DOM
    this._$div_load = document.getElementById("load");
    this._succesCallback = null;
    this._errorCallback = null;
    this._errors = 0;
    this._prepareLoader();
  }

  load(succesCallback: any, errorCallback: any) {
    this._succesCallback = succesCallback;
    this._errorCallback = errorCallback;
    this.assets.load();
  }

  private _onAssetsLoadComplete() {
    if (this._errors) this._errorCallback();
    this._$div_load.style.display = "none";
    this._succesCallback();
  }

  private _onAssetsLoadError() {
    this._errors++;
  }

  private _prepareLoader() {
    //assets to load
    this.assets.add("ninja", "./assets/ninja/ninja.json");
    this.assets.add("stage1", "./assets/stage/stage1.png");
    this.assets.add("stage2", "./assets/stage/stage2.png");
    this.assets.add("stage3", "./assets/stage/stage3.png");
    //update the progress percentage on each file load
    this.assets.onProgress.add((a) => {
      this._$div_load.innerHTML =
        messages.loadingAssets + a.progress + a.defaultQueryString;
    });
    //sum 1 error for each not loaded file
    this.assets.onError.add(() => {
      this._onAssetsLoadError();
    });
    //call succes or error callback (if there is at least one error)
    this.assets.onComplete.add(() => {
      this._onAssetsLoadComplete();
    });
  }
}

export const loader = new Loader();
