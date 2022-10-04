/**
 * Set the player id, and direction according if it is player one or two
 * @param {{x:number,y:number}} screenSize screen size
 * @param {string} id player id
 * @param {boolean} isHost is host (player one)
 * @returns Return an object that represents the first state of players
 */
function PlayersInitState(screenSize, id, isHost) {
  let state = {
    id: id,
    screen: screenSize,
    coord: {
      x: 0,
      y: 0,
    },
    mode: "Idle",
    direction: 0,
    jump: 0,
    slide: false,
    dead: false,
    life: 100,
  };
  //set direction and coord for p1 and p2
  if (isHost) {
    state.direction = 1;
    state.coord.x = state.screen.x / 4;
    state.coord.y = state.screen.y - 110;
  } else {
    state.direction = -1;
    state.coord.x = (state.screen.x / 4) * 3;
    state.coord.y = state.screen.y - 110;
  }
  return state;
}

function PositionNinjas(players) {}

module.exports.PlayersInitState = PlayersInitState;
