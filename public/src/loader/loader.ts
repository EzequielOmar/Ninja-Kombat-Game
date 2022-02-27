import { lobby } from "../views/lobby";

/**
 * This class handle the assets load
 */
class Loader {
  assets: PIXI.Loader;
  private _errors: number;

  constructor() {
    this.assets = new PIXI.Loader();
    this._errors = 0;
    this._addAssets();
    this._addLoadEvents();
  }

  load() {
    this.assets.load();
  }

  private _addAssets() {
    //assets to load
    this.assets.add("ninja", "./assets/ninja/ninja.json");
    this.assets.add("stage1", "./assets/stage/stage1.png");
    this.assets.add("stage2", "./assets/stage/stage2.png");
    this.assets.add("stage3", "./assets/stage/stage3.png");
  }

  private _addLoadEvents() {
    //update the progress percentage on each file load
    this.assets.onProgress.add((e) => lobby.setLoadingPercentage(e.progress));
    //sum 1 error for each not loaded file
    this.assets.onError.add(() => this._errors++);
    //if there is at least one error -> dispatch error event else continue game flow
    this.assets.onComplete.add(() => {
      if (this._errors) window.dispatchEvent(new Event("assetsLoadError"));
      else window.dispatchEvent(new Event("assetsLoadSucces"));
    });
  }
}

export const loader = new Loader();
