// Grid Based game
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rows = 5;
let cols = 5;

let tileSize;
let startX;
let startY;

let totalTowerSize;

function preload(){
  bombImage = loadImage("bomb.jpg");
  questionMarkImage = loadImage("questionMark");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileSize = windowWidth * 0.07 ;
  bombImage.reize(tileSize, tileSize);
  questionMarkImage.resize(tileSize, tileSize);

}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  tileSize = windowWidth * 0.07 ;

}

function draw() {
  background(220);
  drawGrid();
}


function drawGrid(){
  totalTowerSize = cols * tileSize;

  startX = windowWidth/2 - totalTowerSize /2;
  startY = windowHeight/2 - totalTowerSize /2;

  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      let x = startX + c * tileSize;
      let y = startY + r * tileSize;
      
      square(x, y, tileSize);
      image(questionMarkImage, x ,y, tileSize);
    }
  }
}