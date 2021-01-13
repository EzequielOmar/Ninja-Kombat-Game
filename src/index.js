const AnimationLoop = require('./animationloop');

const app = new PIXI.Application({ 
    width: 1050, 
    height: 550,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  });
  //Aliases.
  let Application = PIXI.Application,
  loader = PIXI.Loader.shared,
  resources = loader.resources,
  Sprite = PIXI.Sprite,
  AnimatedSprite = PIXI.AnimatedSprite,
  Container = PIXI.Container,
  
  renderer = app.renderer,
  stage = app.stage,
  view = app.view,
  gravity = 0.66;
  
  
  document.body.appendChild(view);
  
  var animationLoop = new AnimationLoop(renderer,stage);
  animationLoop.start();
  
  animationLoop.on('prerender', function(){
    console.log(this.delta);
});