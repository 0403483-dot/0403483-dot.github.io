// Grid Based game
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "stopped";

let bet = 25;
let money = 500;
let winMultiplier = 1;
let safeClicks = 0;

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
let cashOutButton;

let revealedTiles;
let grid = [];

let revealAllTiles = false;

let dingSound;
let wrongTileSound;

function preload(){
  dingSound = loadSound("correctTileSound.wav");
  wrongTileSound = loadSound("wrongTileSound.wav");
  
  
  bombImage = loadImage("bomb.jpg");
  questionMarkImage = loadImage("unknownTile.png");
  diamondImage = loadImage("diamondTileImage.avif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tileY = windowHeight* 0.12;
  tileX = windowWidth * 0.07;
  bombImage.resize(tileX, tileY);
  questionMarkImage.resize(tileX, tileY);
  diamondImage.resize(tileX,tileY);
  
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
  if(gameState === "stopped"){
    slider.removeAttribute('disabled');
  }
  else if (gameState === "playing"){
    slider.attribute('disabled', '');
  }
  numberOfBombs = slider.value();
  drawButton();
  drawText();
  
}


function drawGrid(){
  spacingX = windowWidth/55;
  spacingY = windowHeight/55;

  totalGridW = cols*tileX + (cols -1)* spacingX;
  totalGridH = rows*tileY + (rows -1)* spacingY;

  startX = windowWidth/2 - totalGridW /2;
  startY = windowHeight/2 - totalGridH /2;
   
  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      let x = startX + c * (tileX + spacingX);
      let y = startY + r * (tileY + spacingY);
      
      if (gameState === "stopped"){
        image(questionMarkImage, x ,y, tileX, tileY);

      }
      
      if (gameState === "playing"){
        if (revealedTiles[r][c] === false) {
          image(questionMarkImage, x, y, tileX, tileY);
        }
        else{
          image(diamondImage, x, y, tileX, tileY);
        }
      }
      if (revealAllTiles){
        if (grid[r][c] === "bomb"){
          image(bombImage, x ,y, tileX, tileY);
        }
        if (grid[r][c] === "safe"){
          image(diamondImage, x ,y, tileX, tileY);
        }
 

      }
    }
  }

}


function drawButton(){
  betButton = {
    x: windowWidth * 0.45,
    y: startY + totalGridH + tileY/5,
    w: windowWidth * 0.1,
    h: windowHeight * 0.05,
  };
  cashOutButton = {
    x: windowWidth * 0.1,
    y: windowHeight/2,
    w: windowWidth * 0.1,
    h: windowHeight * 0.05,
  };

  if (gameState === "stopped"){
    fill("green");
    rect(betButton.x, betButton.y, betButton.w, betButton.h);
  }
  else if (gameState === "playing"){
    fill("red");
    rect(cashOutButton.x, cashOutButton.y, cashOutButton.w, cashOutButton.h);

  }

}


function inButton(button){
  return mouseX > button.x && mouseX < button.x + button.w && mouseY > button.y && mouseY < button.y + button.h;
}


function mousePressed(){
  if (inButton(betButton) && gameState === "stopped"){
    placeBet();
    generateGrid();
    gameState = "playing";
    revealAllTiles = false;
  }

  if (inButton(cashOutButton) && gameState === "playing"){
    gameState = "stopped";
    cashOut();
  }

  if (gameState === "playing"){
    for (let r = 0; r < rows; r++){
      for (let c = 0; c < cols; c++){
        let x = startX + c * (tileX + spacingX);
        let y = startY + r * (tileY + spacingY);

        // check if mouse is inside tile
        if (mouseX > x && mouseX < x + tileX &&
          mouseY > y && mouseY < y + tileY){

          revealedTiles[r][c] = true;

          if (grid[r][c] === "bomb"){
            gameState = "stopped";
            revealAllTiles = true;
            wrongTileSound.play();
          }
          else{
            safeClicks++;

            let totalTiles = rows * cols;
            let safeTiles = totalTiles - numberOfBombs;

            winMultiplier *= (totalTiles / safeTiles);
            dingSound.play  ();
          }


          if(safeClicks === 25 - numberOfBombs){
            revealAllTiles = true;
            cashOut();
          }
        }
      }
    }
  }
}


function drawText(){
  fill("white");
  textSize(windowWidth*0.015);
  text("Number Of Bombs: " + numberOfBombs, windowWidth*0.43, windowHeight*0.95);


  if (gameState === "stopped"){
    text("Place Bet", betButton.x + windowWidth/64, betButton.y + windowHeight/30);
  }
  else if (gameState === "playing"){
    text("Cash Out", cashOutButton.x + windowWidth/64, cashOutButton.y + windowHeight/30);
  }
  fill(0, 150, 0);
  textSize(windowWidth*0.015);
  textStyle(BOLD);
  text("Money $" + money.toFixed(2), windowWidth*0.8, windowHeight* 0.05); 

  fill(200, 150, 0);
  text("Bet: $" + bet, windowWidth*0.8, windowHeight*0.09); 

  fill(255);
  text("Bet Multiplier:"  + winMultiplier.toFixed(2) + "x", windowWidth*0.8, windowHeight* 0.15); 

  textSize(windowWidth*0.01);

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

  }
}

function placeBet(){
  safeClicks = 0;
  winMultiplier = 1;
  if (bet <= money){ // ensures the player cannot bet more money than they currently have
    money -= bet;
  }
}

function cashOut(){
  gameState = "stopped";
  money += bet * winMultiplier;
}

