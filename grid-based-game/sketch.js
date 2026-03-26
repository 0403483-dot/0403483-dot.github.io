// Grid Based game
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rows = 5;
let cols = 5;

let tileX;
let tileY;
let startX;
let startY;

let totalTowerSize;
let spacingX;
let spacingY;

function preload(){
  bombImage = loadImage("bomb.jpg");
  questionMarkImage = loadImage("unknownTile.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileY = windowHeight* 0.12;
  tileX = windowWidth * 0.07;
  bombImage.resize(tileX, tileY);
  questionMarkImage.resize(tileX, tileY);

}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  tileY = windowHeight* 0.12;
  tileX = windowWidth * 0.07;

}

function draw() {
  background(0);
  drawGrid();
}


function drawGrid(){
  spacingX = windowWidth/55;
  spacingY = windowHeight/55;

  totalTowerW = cols*tileX + (cols -1)* spacingX;
  totalTowerH = rows*tileY + (rows -1)* spacingY;

  startX = windowWidth/2 - totalTowerW /2;
  startY = windowHeight/2 - totalTowerH /2;

  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      let x = startX + c * (tileX + spacingX);
      let y = startY + r * (tileY + spacingY);
      
      // square(x, y, tileSize);
      image(questionMarkImage, x ,y, tileX, tileY);
    }
  }
}