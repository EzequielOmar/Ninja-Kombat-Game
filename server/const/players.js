module.exports = function playersInitState(screenSize) {
  const p1 = {
    coordinates: {
      x: screenSize.x / 4,
      y: screenSize.y - 110,
    },
    mode: "Idle",
    direction: 1,
    jump: 0,
    slide: false,
    dead: false,
  };
  return p1;
};