// Array/Object Noatation Assignment
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

let bet = 25;
let betMax = 500;
let betMin = 25;
let currentRow = 0;

let money = 1000;
let gameRow; 


let buttonX; 
let buttonY;

let startX;
let startY;

let winMultiplier;



function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonX = windowWidth*0.5;
  buttonY = windowHeight*0.9;
}

function draw() {
  betButton = {
    x: startX + startX/2.6,
    y: windowHeight/2 + totalTowerH/1.5,
    w: windowWidth* 0.1,
    h: 40,
  };
  hardButton = {
    x: windowWidth* 0.58,
    y: windowHeight/2 + totalTowerH/1.5,
    w: windowWidth* 0.1,
    h: 40,
  };
  cashOutButton = {
    x: startX + startX/2.6,
    y: startY + totalTowerH ,
    w: windowWidth * 0.1,
    h: windowHeight * 0.035,
  };
  easyButton = {
    x: windowWidth *0.33,
    y: windowHeight/2 + totalTowerH/1.5,
    w: windowWidth* 0.1,
    h: 40,
  };
  background(25);
  drawText(); 
  drawTower();
  if (gameState === "stopped"){
    drawButton(betButton, "Place Bet");
    drawButton(easyButton, "Easy Mode");
    drawButton(hardButton, "Hard Mode");

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

  textAlign(LEFT, TOP);
  textSize(windowWidth*0.01);
}

function drawTower(){
  let tileW = windowWidth/15;
  let tileH = windowHeight/20;
  let spacingX = windowWidth/40;
  let spacingY = windowHeight/50;

  totalTowerW = columns*tileW + (columns -1)* spacingX;
  totalTowerH = rows*tileH + (rows -1)* spacingY;

  startX =  windowWidth/2 - totalTowerW/2; // centers the tower
  startY =  windowHeight/2 - totalTowerH/2;

  for (let r = 0; r < rows; r ++){
    for (let c = 0; c < columns; c++){
      let x = startX + c * (tileW + spacingX);
      let y = startY + r * (tileH + spacingY);

      fill(150);
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
  }
}


function drawButton(button, label){
  fill(50);
  stroke(150);
  rect(button.x, button.y, button.w, button.h,);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text(label, button.x + button.w/2, button.y + button.h/2);

}

function mousePressed(){
  if (inButton(easyButton) && gameState === "stopped"){
    rows = 5;
    columns = 8;
  }
  if (inButton(hardButton)&& gameState === "stopped"){
    rows = 10;
    columns = 5;
  }
  if (inButton(betButton)&& gameState === "stopped"){
    gameState = "playing";
    placeBet();
  }
  if (inButton(cashOutButton)&& gameState === "playing"){
    gameState = "stopped";
  }
}

function inButton(button){
  return mouseX > button.x 
  && mouseX < button.x + button.w 
  && mouseY > button.y 
  && mouseY < button.y + button.h;
}

function windowResized(){
  
}