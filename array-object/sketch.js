// Array/Object Notation Assignment
// Jonathan Hlady
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "stopped";

let rows = 8;
let columns = 4;
let totalTowerH;
let totalTowerW;
let tower = [];
let revealedTiles = [];
let bombsPerRow = 1;

let tileW;
let tileH;
let spacingX;
let spacingY;

let bet = 25;
let betMax = 500;
let betMin = 25;
let money = 1000;


let gameRow; 
let currentRow = 0;

let betButton;
let normalModeButton;
let easyModeButton;
let hardModeButton;
let cashOutButton;

let startX;
let startY;

let winMultiplier = 1;
let winMultplierIncrements = 0.5;

let selectedMode = "normal";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(25);
  drawText(); 
  drawTower();
  betButton = {
    x: windowWidth * 0.45,
    y: startY + totalTowerH + windowHeight*0.1,
    w: windowWidth* 0.1,
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

  }
  if (gameState === "stopped"){
    drawButton(betButton, "Place Bet");
    drawButton(easyModeButton, "Easy Mode", "easy");
    drawButton(hardModeButton, "Hard Mode", "hard");
    drawButton(normalModeButton, "Normal Mode", "normal");

  }
  else if (gameState === "playing"){
    drawButton(cashOutButton, "Cash Out");
  }
 
}

function drawText(){
  fill(0, 150, 0);
  textSize(windowWidth*0.015);
  textStyle(BOLD);
  text("Money $" + money, windowWidth*0.8, windowHeight* 0.05); 

  fill(200, 150, 0);
  text("Bet: $" + bet, windowWidth*0.8, windowHeight*0.09); 

  fill(255);
  text("Bet Multiplier:"  + winMultiplier + "x", windowWidth*0.8, windowHeight* 0.15); 

  textAlign(LEFT, TOP);
  textSize(windowWidth*0.01);
}

function drawTower(){
  tileW = windowWidth/15;
  tileH = windowHeight/20;
  spacingX = windowWidth/40;
  spacingY = windowHeight/50;

  totalTowerW = columns*tileW + (columns -1)* spacingX;
  totalTowerH = rows*tileH + (rows -1)* spacingY;

  startX =  windowWidth/2 - totalTowerW/2; // centers the tower
  startY =  windowHeight/2 - totalTowerH/2;

  if (gameState === "playing" && currentRow >=0){
    noFill();
    stroke(255);
    strokeWeight(8);
    rect(startX, startY + currentRow * (tileH + spacingY), totalTowerW, tileH,8)
    strokeWeight(1);
    stroke(0);
  }

  for (let r = 0; r < rows; r ++){
    for (let c = 0; c < columns; c++){
      let x = startX + c * (tileW + spacingX);
      let y = startY + r * (tileH + spacingY);

      if (revealedTiles[r] && revealedTiles[r][c]){
        if (tower[r][c] === "bomb"){
          fill(200,0,0);
        }
        else{
          fill(0,200,0);
        }
      }
      else{
        fill(80);
      }
      rect(x, y, tileW, tileH, 8);
      }
    }
}
  

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
function placeBet(){

  if (bet <= money){
    money -= bet;
    generateTower();
    gameState = "playing";
  }
}


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
    if (inButton(easyModeButton)){
      columns = 6;
      bombsPerRow = 1;
      winMultplierIncrements = 0.1;
      selectedMode = "easy";
  }
    else if (inButton(hardModeButton)){
      columns = 4;
      bombsPerRow = 3;
      winMultplierIncrements = 1;
      selectedMode = "hard";
  }
    else if (inButton(normalModeButton)){
      columns = 4;
      bombsPerRow = 1;
      winMultplierIncrements = 0.25;
      selectedMode = "normal";
  }
    else if (inButton(betButton)){
      placeBet();
  }
  }
  else if (gameState === "playing")
    if (inButton(cashOutButton)){
      gameState = "stopped";
      money += bet * winMultiplier;
      winMultiplier = 1;
      return;
  }
  if (gameState === "playing" && currentRow >= 0){
    for (let c = 0; c < columns; c++){
      let x = startX + c* (tileW +spacingX);
      let y = startY + currentRow * (tileH + spacingY);

      if (mouseX > x && mouseX < x + tileW && mouseY > y && mouseY < y +tileH){
       revealedTiles[currentRow][c] = true;
    
        if (tower[currentRow][c] === "bomb"){
          gameState = "stopped"
    }
        else{
        currentRow --;
        winMultiplier += winMultplierIncrements;
    }
    break;
  }
  }
}
}

function inButton(button){
  return mouseX > button.x && mouseX < button.x + button.w && mouseY > button.y && mouseY < button.y + button.h;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function generateTower(){
  tower = []; // clears the arrays for a new game each time 
  revealedTiles = [];

  for (let r = 0; r < rows; r ++){
    tower[r] = []; // makes each row a new array inside the main array
    revealedTiles[r]= [];

    for (let c = 0; c < columns; c++){
      tower[r][c] = "safe"; // sets each tile to be safe
      revealedTiles[r][c] = false; // no tiles have been revealed yet
    }
    let bombsPlaced = 0;

    while (bombsPlaced < bombsPerRow){
      let randomColumn = floor(random(columns));

      if (tower[r][randomColumn] === "safe"){
        tower[r][randomColumn] = "bomb";
        bombsPlaced ++;

      }
    }
  }
  currentRow = rows - 1;
}