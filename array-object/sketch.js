// Array/Object Notation Assignment
// Jonathan Hlady
// March 5/26
//
// Extra for Experts:
// - I made the game fully scalable with different window sizes.
// - I added sound effects for clicking correct tiles, incorrect tiles and cashing out.
// - I learned how 2d arrays work and implemented them to create the tower (I know thats the next assignment but this was pretty hard to make without them)

//game state variable that controls whether a bet is in play or not
let gameState = "stopped";

// tower dimensions
let rows = 8;
let columns = 4;
let totalTowerH;
let totalTowerW;

//arrays that store the tower tiles and revealed tiles
let tower = [];
let revealedTiles = [];
let bombsPerRow = 1;

//size of tiles and the spacing to ensure even drawing of the tower
let tileW;
let tileH;
let spacingX;
let spacingY;

//betting system
let bet = 25;
let betMax = 500;
let betMin = 25;
let money = 1000;

//tracks which row the player is currently on
let currentRow = 0; 

//variables for drawing the buttons
let betButton;
let normalModeButton;
let easyModeButton;
let hardModeButton;
let cashOutButton;

//starting position used to center the tower on the screen
let startX;
let startY;

// keeps tack of how much user is winning
let winMultiplier = 1;
let winMultiplierIncrements = 0.5;


let selectedMode = "normal"; // gamemode

//sound effect variables
let dingSound;
let wrongTileSound;
let cashOutSound;

//loads sound files before starting program
function preload(){
  dingSound = loadSound("ding.wav");
  wrongTileSound = loadSound("wrong.wav");
  cashOutSound = loadSound("ka-ching.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  //defines button positions and sizes relative to the tower
  betButton = {
    x: windowWidth * 0.45,
    y: startY + totalTowerH + windowHeight*0.1,
    w: windowWidth * 0.1,
    h: windowHeight * 0.04,
  };
  hardModeButton = {
    x: windowWidth * 0.60,
    y: startY + totalTowerH + windowHeight*0.04,
    w: windowWidth* 0.1,
    h: windowHeight * 0.04,
  };
  cashOutButton = {
    x: windowWidth * 0.45,
    y: startY + totalTowerH + windowHeight*0.1,
    w: windowWidth * 0.08,
    h: windowHeight * 0.04,
  };
  easyModeButton = {
    x: windowWidth * 0.30,
    y: startY + totalTowerH + windowHeight*0.04,
    w: windowWidth* 0.1,
    h: windowHeight * 0.04,
  };
  normalModeButton = {
    x: windowWidth * 0.45,
    y: startY + totalTowerH + windowHeight*0.04,

    w: windowWidth *0.1,
    h: windowHeight * 0.04

  };
  background(25);
  drawText(); 
  drawTower();

  //when a bet isnt placed show the 4 buttons that change gamemode and allow user to place a bet
  if (gameState === "stopped"){
    drawButton(betButton, "Place Bet");
    drawButton(easyModeButton, "Easy Mode", "easy");
    drawButton(hardModeButton, "Hard Mode", "hard");
    drawButton(normalModeButton, "Normal Mode", "normal");

  }
  //if game in play, draw the button that allows the user to cash out
  else if (gameState === "playing"){
    drawButton(cashOutButton, "Cash Out");
  }
 
}

//function that draws all the text on the screen and displays users money, bet and the win multiplier
function drawText(){
  fill(0, 150, 0);
  textSize(windowWidth*0.015);
  textStyle(BOLD);
  text("Money $" + money, windowWidth*0.8, windowHeight* 0.05); 

  fill(200, 150, 0);
  text("Bet: $" + bet, windowWidth*0.8, windowHeight*0.09); 

  fill(255);
  text("Bet Multiplier:"  + winMultiplier.toFixed(2) + "x", windowWidth*0.8, windowHeight* 0.15); 

  textAlign(LEFT, TOP);
  textSize(windowWidth*0.01);
}

//function that will only display the towers tiles and the highlighted row when the game is playing
function drawTower(){

  tileW = windowWidth/15;
  tileH = windowHeight/20;
  spacingX = windowWidth/40;
  spacingY = windowHeight/50;

  //calculates the total width of the tower for accurate placing of the buttons
  totalTowerW = columns*tileW + (columns -1)* spacingX;
  totalTowerH = rows*tileH + (rows -1)* spacingY;

  startX =  windowWidth/2 - totalTowerW/2; // centers the tower
  startY =  windowHeight/2 - totalTowerH/2;

  
  //visually highlights the row the player must currently choose from, helping guide the player up the tower
  if (gameState === "playing" && currentRow >=0){
    stroke(255);
    strokeWeight(8);
    rect(startX, startY + currentRow * (tileH + spacingY), totalTowerW, tileH,8);
    strokeWeight(1);
    stroke(0);
  }

  //draws a tower with the imputed amount of rows and columns based on gamemode
  for (let r = 0; r < rows; r ++){
    for (let c = 0; c < columns; c++){
      let x = startX + c * (tileW + spacingX);
      let y = startY + r * (tileH + spacingY);

      //only show the true tile color after it has been clicked
      //revealedTiles determines whether the tile should still appear hidden
      if (revealedTiles[r] && revealedTiles[r][c]){
        if (tower[r][c] === "bomb"){
          fill(200,0,0); //bombs are red
        }
        else{
          fill(0,200,0); //safe tiles are green
        }
      }
      else{
        fill(80);
      }
      rect(x, y, tileW, tileH, 8);
    }
  }
}
  
//function that changes the users bet by scrolling the wheel up or down
//limits ensure that the bet cannot exceed the maximum or go below the minimum
function mouseWheel(event){  
  if (gameState === "stopped"){
    if (event.delta < 0 && bet < betMax){ // can't bet over $500
      bet+=5;
    }
    else if(event.delta > 0 && bet > betMin){ // can't bet under $25
      bet -=5;
    }  
  }
  return false; // so that the screen doesn't scroll when the mouse wheel scrolls.
}


//starts a new round by deducting the players bet from their money
//generates a new randomized tower layout
function placeBet(){
  winMultiplier = 1;
  if (bet <= money){ // ensures the player cannot bet more money than they currently have
    money -= bet;
    generateTower();
    gameState = "playing";
  }
}


//draws the buttons based on the imputed button
//this function can create multiple buttons by passing in different button objects and labels
function drawButton(button, label, mode){
  if(selectedMode === mode){
    fill(0);
  }
  else{
    fill(50);
  }
  stroke(150);
  rect(button.x, button.y, button.w, button.h);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text(label, button.x + button.w/2, button.y + button.h/2);

}


function mousePressed(){
  if (gameState === "stopped"){

    //changes gamemode to easy and makes 1 of 6 tiles a bomb
    if (inButton(easyModeButton)){
      columns = 6;
      bombsPerRow = 1;
      winMultiplierIncrements = 0.2;
      selectedMode = "easy";
    }

    //changes gamemode to hard and makes 3 of 4 tiles a bomb
    else if (inButton(hardModeButton)){
      columns = 4;
      bombsPerRow = 3;
      winMultiplierIncrements = 1;
      selectedMode = "hard";
    }
    //changes gamemode to normal and makes 1 in 4 tiles a bomb
    else if (inButton(normalModeButton)){
      columns = 4;
      bombsPerRow = 1;
      winMultiplierIncrements = 0.25;
      selectedMode = "normal";
    }

    //calls the place bet function to start the round
    else if (inButton(betButton)){
      placeBet();
    }
  }
  //allows user to cashout and end the game
  else if (gameState === "playing") {
    if (inButton(cashOutButton)){
      gameState = "stopped";
      money += bet * winMultiplier;
      winMultiplier = 1;
      cashOutSound.play();
      return;
    }
  }

  //when playing, the player can click tiles in the current row
  if (gameState === "playing" && currentRow >= 0){
    
    //loops through every column in the current row to determine which tile the player clicked
    for (let c = 0; c < columns; c++){
      let x = startX + c* (tileW +spacingX);
      let y = startY + currentRow * (tileH + spacingY);

      //checks if the mouse click occured inside a tile
      if (mouseX > x && mouseX < x + tileW && mouseY > y && mouseY < y +tileH){
        revealedTiles[currentRow][c] = true;
        
        //if the tile is a bomb, the player immediately loses
        if (tower[currentRow][c] === "bomb"){
          gameState = "stopped";
          wrongTileSound.play();
        }
        
        //if the tile is safe, the user moves up in the tower
        else{
          currentRow --;
          winMultiplier += winMultiplierIncrements;
          dingSound.play();
        }

        // stop checking other tiles once the correct tile is found
        break;
      }
    }
  }
}

//function that checks if the mouse is within any button and returns
function inButton(button){
  return mouseX > button.x && mouseX < button.x + button.w && mouseY > button.y && mouseY < button.y + button.h;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

//generates whether each tile is safe or a bomb throughout the whole tower
function generateTower(){
  // clears the arrays for a new game each time 
  tower = []; //stores where bombs are located
  revealedTiles = []; // tracks which tiles have been clicked

  //loops through each row of the tower to build the 2d grid
  for (let r = 0; r < rows; r ++){
    tower[r] = []; // makes each row a new array inside the main array
    revealedTiles[r]= [];


    for (let c = 0; c < columns; c++){
      tower[r][c] = "safe"; // sets each tile to be safe
      revealedTiles[r][c] = false; // no tiles have been revealed yet
    }


    //tracks amount of bombs that have been placed
    let bombsPlaced = 0;

    //continues placing bombs randomly until required number is reached
    while (bombsPlaced < bombsPerRow){

      let randomColumn = floor(random(columns)); //chooses random column within the row

      //only place a bomb if the tile is currently safe so multiple bombs dont end up on the same tile
      if (tower[r][randomColumn] === "safe"){
        tower[r][randomColumn] = "bomb";
        bombsPlaced ++;

      }
    }
  }
  //player begins on botton row and moves up the tower
  currentRow = rows - 1;
}