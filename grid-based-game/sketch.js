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

let spacingX;
let spacingY;

let slider;
let numberOfBombs;
let sliderSize;


let revealedTiles;


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
  
  sliderSize = windowWidth *0.33;
  
  slider = createSlider(1, 25, 1, 1);
  slider.size(sliderSize);
  slider.position(windowWidth/2 - sliderSize/2, windowHeight * 0.95);
  

}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  tileY = windowHeight* 0.12;
  tileX = windowWidth * 0.07;
  
  sliderSize = windowWidth *0.33;
  slider.size(sliderSize);

  slider.position(windowWidth/2 - sliderSize/2, windowHeight * 0.95);
  
}

function draw() {
  background(0);
  drawGrid();
  drawText();
  numberOfBombs = slider.value();
  generateGrid();
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


function mousePressed(){
  let x = Math.floor(mouseX/tileX);
  let y = Math.floor(mouseY/tileY);

  checkTile(x , y);
}

function drawText(){
  fill("white");
  textSize(windowWidth*0.015);
  text("Number Of Bombs: " + numberOfBombs, windowWidth*0.45, windowHeight*0.925);
}

function checkTile(){

}

function generateGrid(){
  // clears the arrays for a new game each time 
  let grid = []; //stores where bombs are located
  revealedTiles = []; // tracks which tiles have been clicked

  //loops through each row of the tower to build the 2d grid
  for (let r = 0; r < rows; r ++){
    grid[r] = []; // makes each row a new array inside the main array
    revealedTiles[r]= [];
    for (let c = 0; c < cols; c++){
      grid[r][c] = "safe"; // sets each tile to be safe
      revealedTiles[r][c] = false; // no tiles have been revealed yet
    }

    //tracks amount of bombs that have been placed
    let bombsPlaced = 0;

    //continues placing bombs randomly until required number is reached
    while (bombsPlaced < numberOfBombs){

      let randomPlacementX = floor(random(cols)); //chooses random column within the row
      let randomPlacementY = floor(random(rows));

      //only place a bomb if the tile is currently safe so multiple bombs dont end up on the same tile
      if (grid[randomPlacementY][randomPlacementX] === "safe"){
        grid[randomPlacementY][randomPlacementX] = "bomb";
        bombsPlaced ++;
      }
      else{

      }
    }
  }
}