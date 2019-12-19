//Create Pixi Application.
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

//Key codes
let left = keyboard("ArrowLeft"),
    up = keyboard("ArrowUp"),
    right = keyboard("ArrowRight"),
    down = keyboard("ArrowDown"),
    shiftright = keyboard("1"),
    controlright = keyboard("2"),

    keya = keyboard("a"),
    keyw = keyboard("w"),
    keyd = keyboard("d"),
    keys = keyboard("s");
    keyf = keyboard("f");
    keyg = keyboard("g");

//players
let player1 = {
  x: 100,
  y: 100,
  health: 100,
  vx: 0,
  vy: 0,
  speed: 10,
  range:185,
  damage:1,
  lastDir: "r",
  runleft:false,
  runright: false,
  jump : false,
  ground: false,
  slide: false,
  attack: false,
  throw: false,
  dead: false,
  kills: 0
},
player2 = {
  x: 850,
  y: 100,
  health: 100,
  vx: 0,
  vy: 0,
  speed: 10,
  range:185,
  damage:1,
  lastDir: "l",
  runleft:false,
  runright: false,
  jump : false,
  ground: false,
  slide: false,
  attack: false,
  throw: false,
  dead: false,
  kills: 0
};

//Add add.stage to document.
document.body.appendChild(view);

//Load all images,sounds and json files.
loader.add("ninja.json").load(gameFlow);

function gameFlow(){
  /**
  * Manage gameflow. Set game state.
  * Call ticker.
  */
  drawPlayers();
  onKeyEvent();

  state = play;
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
  /**
   * Update the current game state.
   */
  state(delta);
}

function play(delta) {
  /**
   * Function called 60fps
   */
  movePlayers();
  manageAnimation();
  manageDamage()
}