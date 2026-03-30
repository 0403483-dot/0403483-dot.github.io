// Grid Based game
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "stopped";

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

let betButton;

let revealedTiles;
let grid = [];

function preload(){
  // dingSound = loadSound("ding.wav");
  // wrongTileSound = loadSound("wrong.wav");
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
  
  slider = createSlider(1, 24, 1, 1);
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
  numberOfBombs = slider.value();
  drawText();
  drawButton();
  // generateGrid();
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

function drawButton(){
  betButton = {
    x: windowWidth * 0.45,
    y: startY + totalTowerH,
    w: windowWidth * 0.1,
    h: windowHeight * 0.04,
  };

  rect(betButton.x, betButton.y, betButton.w, betButton.h);

}

function inButton(button){
  return mouseX > button.x && mouseX < button.x + button.w && mouseY > button.y && mouseY < button.y + button.h;
}


function mousePressed(){
  if (inButton(betButton) && gameState === "stopped"){
    generateGrid();
  }

  for (let c = 0; c < cols; c++){
    let x = startX + c* (tileX +spacingX);
    let y = startY + (tileY + spacingY);
    
    //checks if the mouse click occured inside a tile
    if (mouseX > x && mouseX < x + tileX && mouseY > y && mouseY < y +tileY){
      revealedTiles[r][c] = true;
        
      //if the tile is a bomb, the player immediately loses
      if (tower[r][c] === "bomb"){
        gameState = "stopped";
        wrongTileSound.play();
      }
        
      //if the tile is safe, the user moves up in the tower
      else{
        winMultiplier += winMultiplierIncrements;
        dingSound.play();
      }
    }
  }


}

function drawText(){
  fill("white");
  textSize(windowWidth*0.015);
  text("Number Of Bombs: " + numberOfBombs, windowWidth*0.43, windowHeight*0.95);
}


function checkTile(){

}

function generateGrid(){
  // clears the arrays for a new game each time 
  grid = []; //stores where bombs are located
  revealedTiles = []; // tracks which tiles have been clicked

  //loops through each row of the tower to build the 2d grid
  for (let r = 0; r < rows; r ++){
    grid[r] = []; // makes each row a new array inside the main array
    revealedTiles[r]= [];
    for (let c = 0; c < cols; c++){
      grid[r][c] = "safe"; // sets each tile to be safe
      revealedTiles[r][c] = false; // no tiles have been revealed yet
    }
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