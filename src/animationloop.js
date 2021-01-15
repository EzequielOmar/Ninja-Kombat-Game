/**
 * This class has been copied from this git 
 * repo -> https://github.com/Nazariglez/pixi-animationloop
 */
module.exports = class AnimationLoop extends PIXI.utils.EventEmitter {
  /**
   * inicialize fields for managing time
   * 
   * @param {*} renderer from PIXI.Application.renderer
   * @param {*} stage from PIXI.Application.stage (or new PIXI.Container by default)
   */
  constructor(renderer, stage = new PIXI.Container()){
    //inicialize event emitter
    super();
    this.renderer = renderer;
    this.stage = stage;
    this.isRunning = false;
    this._stopOnVisibilityChange = false;
    this._firstDate = 0;
    this.speed = 1;
    this._last = 0;
    this.delta = 0;
    this.deltaMS = 0;
    this.time = 0;
    this._lastTime = 0;
    this.maxFrame = 0.035;
    this.raf = null;
  }
  /**
   * save the time
   * emit 'start' event
   * begin to run the _animate() function
   */  
  start(){
    if(!this.isRunning){
      this.isRunning = true;
      let now = Date.now();
      this._last = now;
      if(this._firstDate === 0)this._firstDate = now;
      this.emit('start');
      this._animate();
    }
  }
  /**
   * Stop the _animate() function
   * emit 'stop' event
   */
  stop(){
    if(this.isRunning){
      this.isRunning = false;
      window.cancelAnimationFrame(this.raf);
      this.emit('stop');
    }
  }
  /**
   * This function is called every frame
   * manage time
   * emit 'prerender' event
   * render the stage
   * emit 'postrender' event
   */
  _animate = () => {
    this.raf = window.requestAnimationFrame(this._animate);

    if(this.stage){
      let now = Date.now();
      this.time += Math.min((now-this._last)/1000,this.maxFrame) * this.speed;
      this.delta = this.time - this._lastTime;
      this.deltaMS = this.delta*1000;
      this._lastTime = this.time;
      this._last = now;

      this.emit('prerender');
      this.renderer.render(this.stage);
      this.emit('postrender');
    }
  };
  /**
   * This function run the stop() or start(), if the browser is minimized
   * emit 'visibilitychange' event
   */
  _onVisibilityChange = () => {
    const isHide = !!(document.hidden || document.webkitHidden || document.mozHidden || document.msHidden);
    if(isHide) {
      this.stop()
    }else {
      this.start();
    }
    this.emit('visibilitychange', isHide);
  };
  /**
   * return the time since _firstDate is saved.
   */
  get realTime(){
    return this._firstDate > 0 ? (Date.now() - this._firstDate)/1000 : 0;
  }
  /**
   * return the _stopOnVisibilityChange value (true or false)
   */
  get stopOnVisibilityChange(){
    return this._stopOnVisibilityChange;
  }
  /**
   * Set the _stopOnVisibilityChange (false by default)
   */
  set stopOnVisibilityChange(value){
    if(value === this._stopOnVisibilityChange)return;
    this._stopOnVisibilityChange = value;
    const evt = getVisibilityChangeEvent();
    if(value){
      document.addEventListener(evt, this._onVisibilityChange);
    }else{
      document.removeEventListener(evt, this._onVisibilityChange);
    }
  }
}
/**
 * Return the type of event according wath browser is being minimized
 */
function getVisibilityChangeEvent(){
  if(typeof document.hidden !== 'undefined'){
      return 'visibilitychange';
  }else if(typeof document.webkitHidden !== 'undefined'){
      return 'webkitvisibilitychange';
  }else if(typeof document.mozHidden !== 'undefined'){
      return 'mozvisibilitychange';
  }else if(typeof document.msHidden !== 'undefined'){
      return 'msvisibilitychange';
  }
}

