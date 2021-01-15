const loader = require("./loader");
const game = require("./game");

try{
    //not working error catch on failed load resources
    loader.load()
    let currentGame = new game();
    console.log(currentGame.root_containter);
    console.log(currentGame.animationLoop);
}catch(e){
    console.log(e);
}

 