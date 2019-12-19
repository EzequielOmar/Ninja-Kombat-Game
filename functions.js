/*****************************************************************************
 * gameFlow() FUNCTIONS *******************************************************
******************************************************************************/
function drawPlayers(){
    /**
     * Prepare animations and textures.
     * Add players on stage.
     * => gameFlow()
     */
    animations = resources["ninja.json"].spritesheet.animations;
    textures = resources["ninja.json"].textures;
    //***********************************************p1 animations
    p1idle = new AnimatedSprite(animations["Idle"]);
    p1idle.animationSpeed= 0.2;
    p1run = new AnimatedSprite(animations["Run"]);
    p1run.animationSpeed= 0.6;
    p1jump = new AnimatedSprite(animations["Jump"]);
    p1jump.animationSpeed= 0.2;
    p1attack = new AnimatedSprite(animations["Attack"]);
    p1attack.animationSpeed= 0.5;
    p1jumpattack = new AnimatedSprite(animations["Jump-attack"]);
    p1jumpattack.animationSpeed= 0.5;
    p1jumpthrow = new AnimatedSprite(animations["Jump-throw"]);
    p1jumpthrow.animationSpeed= 0.5;
    p1throw = new AnimatedSprite(animations["Throw"]);
    p1throw.animationSpeed= 0.5;
    p1dead = new AnimatedSprite(animations["Dead"]);
    p1dead.animationSpeed= 0.2;
    p1slide = new AnimatedSprite(animations["Slide"]);
    p1slide.animationSpeed= 0.6;
    //***********************************************p2 animations
    p2idle = new AnimatedSprite(animations["Idle"]);
    p2idle.animationSpeed= 0.2;
    p2run = new AnimatedSprite(animations["Run"]);
    p2run.animationSpeed= 0.6;
    p2jump = new AnimatedSprite(animations["Jump"]);
    p2jump.animationSpeed= 0.2;
    p2attack = new AnimatedSprite(animations["Attack"]);
    p2attack.animationSpeed= 0.5;
    p2jumpattack = new AnimatedSprite(animations["Jump-attack"]);
    p2jumpattack.animationSpeed= 0.5;
    p2jumpthrow = new AnimatedSprite(animations["Jump-throw"]);
    p2jumpthrow.animationSpeed= 0.5;
    p2throw = new AnimatedSprite(animations["Throw"]);
    p2throw.animationSpeed= 0.5;
    p2dead = new AnimatedSprite(animations["Dead"]);
    p2slide = new AnimatedSprite(animations["Slide"]);
    p2slide.animationSpeed= 0.6;
    //container Player1
    P1C = new Container();
    P1C.addChild(p1idle);
    //container Player2
    P2C = new Container();
    P2C.addChild(p2idle);
    P2C.scale.x*=-1;
    //kunai Player 1
    kunaip1 = new Sprite(textures["Kunai"]);
    kunaip1.visible = false;
    kunaip1.scale.y*=-1;
    kunaip1.pivot.x=16;
    kunaip1.pivot.y=80;
    //kunai Player 2
    kunaip2 = new Sprite(textures["Kunai"]);
    kunaip2.visible = false;
    kunaip2.scale.y*=-1;
    kunaip2.pivot.x=16;
    kunaip2.pivot.y=80;
    //Add on stage
    stage.addChild(P1C,P2C,kunaip1,kunaip2);
}
function onKeyEvent(){
    /**
     * Set state of player 
     * on key press and key release.
     * =>gameFlow()
     */
    //***********************************************PLAYER 1 KEYS
    //A left
    keya.press = () => {
        player1.vx = -player1.speed;
        player1.lastDir="l";
        player1.runleft= true;
    };
    keya.release = () => {
        player1.vx = 0;
        player1.runleft= false;
    };
    //W up
    keyw.press = () => {
        if(player1.ground && !player1.jump){
            player1.vy = -player1.speed;
            player1.jump=true;
            player1.ground=false;
        }
    };
    keyw.release = () => {
        player1.vy = 0;
    };
    //D right
    keyd.press = () => {
        player1.vx = player1.speed;
        player1.lastDir="r";
        player1.runright= true;
    };
    keyd.release = () => {
        player1.vx = 0;
        player1.runright= false;
    };
    //S down
    keys.press = () => {
        player1.slide=true;
    };
    keys.release = () => {
        player1.slide=false;
    };
    //F attack
    keyf.press = () => {
        player1.attack=true;
    };
    keyf.release = () => {
        player1.attack=false;
    };
    //G kunai
    keyg.press =() => {
        player1.throw=true;
        if(!kunaip1.visible || kunaip1.visible == false){
            kunaip1.visible=true;
            kunaip1.y=player2.y+200;
            if(player1.lastDir == "l"){
                kunaip1.x=player1.x-190;
                kunaip1.vx = -player1.speed;
            }
            if(player1.lastDir == "r"){
                kunaip1.x=player1.x+175;
                kunaip1.vx = player1.speed;
            }
        }
    };
    keyg.release =() => {
        player1.throw=false;
    };
    //***********************************************PLAYER 2 KEYS
    //ArrowLeft
    left.press = () => {
        player2.vx = -player2.speed;
        player2.lastDir="l";
        player2.runleft= true;
    };
    left.release = () => {
        player2.vx = 0;
        player2.runleft= false;
    };
    //ArrowUp
    up.press = () => {
        if(player2.ground && !player2.jump){
            player2.vy = -player2.speed;
            player2.jump=true;
            player2.ground=false;
        }
    };
    up.release = () => {
        player2.vy = 0;
    };
    //ArrowRight
    right.press = () => {
        player2.vx = player2.speed;
        player2.lastDir="r";
        player2.runright= true;
    };
    right.release = () => {
        player2.vx = 0;
        player2.runright= false;
    };
    //ArrowDown
    down.press = () => {
        player2.slide=true;
    };
    down.release = () => {
        player2.slide=false;
    };
    //Shift
    shiftright.press = () => {
        player2.attack=true;
    };
    shiftright.release = () => {
        player2.attack=false;
    };
    //Control
    controlright.press =() => {
        player2.throw=true;
        if(!kunaip2.visible || kunaip2.visible == false){
            kunaip2.visible=true;
            kunaip2.y=player2.y+200;
            if(player2.lastDir == "l"){
                kunaip2.x=player2.x-190;
                kunaip2.vx = -player2.speed;
            }
            if(player2.lastDir == "r"){
                kunaip2.x=player2.x+175;
                kunaip2.vx = player2.speed;
            }
        }
    };
    controlright.release =() => {
        player2.throw=false;
    };
}
/*****************************************************************************
 * play() FUNCTIONS ***********************************************************
******************************************************************************/
function movePlayers(){
    //player1
    player1.x += player1.vx;
    player1.y += player1.vy;
    P1C.x = player1.x;
    P1C.y = player1.y;
    //player2
    player2.x += player2.vx;
    player2.y += player2.vy;
    P2C.x = player2.x;
    P2C.y = player2.y;
}
function manageAnimation(){
    /**
     * Play and manage animations
     * of bolth players on key events.
     */
    //***********************************************PLAYER 1
    //idle
    if(player1.vx == 0 && player1.ground){
        P1C.removeChildren();
        P1C.addChild(p1idle);
        p1idle.play();
        P1C.pivot.x = p1idle.width/2;
    }
    //run left
    if(player1.runleft && player1.vx<0){
        if(P1C.scale.x == 1){
            P1C.scale.x*=-1;
        }
        P1C.removeChildren();
        P1C.addChild(p1run);
        p1run.play();
        P1C.pivot.x = p1run.width/2;
    }
    //run right
    if(player1.runright && player1.vx>0){
        if(P1C.scale.x == -1){
            P1C.scale.x*=-1;
        }
        P1C.removeChildren();
        P1C.addChild(p1run);
        p1run.play();
        P1C.pivot.x = p1run.width/2;
    }
    //jump
    if(!player1.ground && player1.jump){
        P1C.removeChildren();
        P1C.addChild(p1jump);
        p1jump.play();
        P1C.pivot.x = p1jump.width/2;
    }
    //slide
    if(player1.slide){
        P1C.removeChildren();
        P1C.addChild(p1slide);
        p1slide.y=100;    
        p1slide.play();
        P1C.pivot.x = p1slide.width/2;
    }
    //atack
    if(player1.attack){
        if(player1.ground && !player1.jump){
            P1C.removeChildren();
            P1C.addChild(p1attack);
            p1attack.play();
            P1C.pivot.x = p1attack.width/2;
        }
        if(!player1.ground && player1.jump){
            P1C.removeChildren();
            P1C.addChild(p1jumpattack);
            p1jumpattack.play();
            P1C.pivot.x = p1jumpattack.width/2;
        }
    }
    //throw
    if(player1.throw){
        if(player1.ground && !player1.jump){
            P1C.removeChildren();
            P1C.addChild(p1throw);
            p1throw.play();
            P1C.pivot.x = p1throw.width/2;
        }
        if(!player1.ground && player1.jump){
            P1C.removeChildren();
            P1C.addChild(p1jumpthrow);
            p1jumpthrow.play();
            P1C.pivot.x = p1jumpthrow.width/2;
        }
    }
    //gravity floor check
    if (P1C.y>=100){
        player1.ground=true; 
        player1.jump=false;   
        player1.y=100;
    }else{
        if(P1C.y<100){
            player1.ground=false;
            player1.vy += gravity;
        }
    }
    //kunai
    if(kunaip1.visible){
        kunaip1.x+=kunaip1.vx;
        kunaip1.rotation+=.5;
    }
    if(kunaip1.x < 0 || kunaip1.x > 1050){
        kunaip1.visible=false;
    }
    //Dead
    if(player1.health<=0){
        P1C.removeChildren();
        P1C.addChild(p1dead);
        p1dead.play();
        P1C.pivot.x = p1dead.width/2;
    }
    //***********************************************PLAYER 2
    //idle
    if(player2.vx == 0 && player2.ground){
        P2C.removeChildren();
        P2C.addChild(p2idle);
        p2idle.play();
        P2C.pivot.x = p2idle.width/2;
    }
    //run left
    if(player2.runleft && player2.vx<0){
        if(P2C.scale.x == 1){
            P2C.scale.x*=-1;
        }
        P2C.removeChildren();
        P2C.addChild(p2run);
        p2run.play();
        P2C.pivot.x = p2run.width/2;
    }
    //run right
    if(player2.runright && player2.vx>0){
        if(P2C.scale.x == -1){
            P2C.scale.x*=-1;
        }
        P2C.removeChildren();
        P2C.addChild(p2run);
        p2run.play();
        P2C.pivot.x = p2run.width/2;
    }
    //jump
    if(!player2.ground && player2.jump){
        P2C.removeChildren();
        P2C.addChild(p2jump);
        p2jump.play();
        P2C.pivot.x = p2jump.width/2;
    }
    //slide
    if(player2.slide){
        P2C.removeChildren();
        P2C.addChild(p2slide);
        p2slide.y=100;    
        p2slide.play();
        P2C.pivot.x = p2slide.width/2;
    }
    //atack
    if(player2.attack){
        if(player2.ground && !player2.jump){
            P2C.removeChildren();
            P2C.addChild(p2attack);
            p2attack.play();
            P2C.pivot.x = p2attack.width/2;
        }
        if(!player2.ground && player2.jump){
            P2C.removeChildren();
            P2C.addChild(p2jumpattack);
            p2jumpattack.play();
            P2C.pivot.x = p2jumpattack.width/2;
        }
    }
    //throw
    if(player2.throw){
        if(player2.ground && !player2.jump){
            P2C.removeChildren();
            P2C.addChild(p2throw);
            p2throw.play();
            P2C.pivot.x = p2throw.width/2;
        }
        if(!player2.ground && player2.jump){
            P2C.removeChildren();
            P2C.addChild(p2jumpthrow);
            p2jumpthrow.play();
            P2C.pivot.x = p2jumpthrow.width/2;
        }
    }
    //gravity floor check
    if (P2C.y>=100){
        player2.ground=true; 
        player2.jump=false;   
        player2.y=100;
    }else{
        if(P2C.y<100){
            player2.ground=false;
            player2.vy += gravity;
        }
    }
    //kunai
    if(kunaip2.visible){
        kunaip2.x+=kunaip2.vx;
        kunaip2.rotation+=.5;
    }
    if(kunaip2.x < 0 || kunaip2.x > 1050){
        kunaip2.visible=false;
    }
    //Dead
    if(player2.health<=0){
        P2C.removeChildren();
        P2C.addChild(p2dead);
        p2dead.play();
        P2C.pivot.x = p2dead.width/2;
    }
}
function manageDamage(){
    /**
     * Change the health value on attack.
     */
    let p1start = player1.x - Math.abs(P1C.width)/2,
        p1end = player1.x + Math.abs(P1C.width)/2,
        p2start = player2.x - Math.abs(P2C.width)/2,
        p2end = player2.x + Math.abs(P2C.width)/2;
    //PLAYER1 attacks
    if(player1.attack || player1.jump && player1.attack){
        if(player1.lastDir == "r" && p1end >= p2start && (p1end - player1.range) <= p2start
        && player1.y >= player2.y && player1.y <= (player2.y + P2C.height)){
            player2.health-=player1.damage;
            console.log("P2 HP="+player2.health); 
        }
        if(player1.lastDir == "l" && p2end >= p1start && p2end <= (p1start + player1.range)
        && player1.y >= player2.y && player1.y <= (player2.y + P2C.height)){
            player2.health-=player1.damage;
            console.log("P2 HP="+player2.health); 
        }
    }
    if(kunaip1.visible && player1.lastDir == "r" && kunaip1.x >= p2start){
        player2.health-=player1.damage;
        kunaip1.visible=false;
        console.log("P2 HP="+player2.health);  
    }
    if(kunaip1.visible && player1.lastDir == "l" && kunaip1.x <= p2end){
        player2.health-=player1.damage;
        kunaip1.visible=false;
        console.log("P2 HP="+player2.health);  
    }
    //PLAYER2 attacks
    if(player2.attack || player2.jump && player2.attack){
        if(player2.lastDir == "r" && p2end >= p1start && (p2end - player2.range) <= p1start
        && player2.y >= player1.y && player2.y <= (player1.y + P1C.height)){
            player1.health-=player2.damage;
            console.log("P1 HP="+player1.health); 
        }
        if(player2.lastDir == "l" && p1end >= p2start && p1end <= (p2start + player2.range)
        && player2.y >= player1.y && player2.y <= (player1.y + P1C.height)){
            player1.health-=player2.damage;
            console.log("P1 HP="+player1.health); 
        }
    }
    if(kunaip2.visible && player2.lastDir == "r" && kunaip2.x >= p1start){
        player1.health-=player2.damage;
        kunaip2.visible=false;
        console.log("P1 HP="+player1.health);  
    }
    if(kunaip2.visible && player2.lastDir == "l" && kunaip2.x <= p1end){
        player1.health-=player2.damage;
        kunaip2.visible=false;
        console.log("P1 HP="+ player1.health);  
    }
}