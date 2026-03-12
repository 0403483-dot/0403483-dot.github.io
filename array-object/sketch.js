// Array/Object Noatation Assignment
// Jonathan Hlady
// March 5/26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gameState = "stopped";
let gameModeDifficulty = "easy";

let rows = 8;
let columns = 4;
let bet = 25;
let betMax = 500;
let betMin = 25;
let currentRow = 0;
let money = 1000;
let gameRow; 

let buttonX; 
let buttonY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonX = windowWidth*0.5;
  buttonY = windowHeight*0.9;
}

function draw() {
  background(25);
  drawText(); 
  drawTower();
  displayButtons();
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

  let totalW = columns*tileW + (columns -1)* spacingX;
  let totalH = rows*tileH + (rows -1)* spacingY;

  let startX =  windowWidth/2 - totalW/2; // centers the tower
  let startY =  windowHeight/2 - totalH/2;

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
    return false; // so that the screen doesn't scroll when the mouse wheel scrolls.
  }

}

function placeBet(){
  money -= bet;

}

function displayButtons(){
  if (gameState === "stopped"){  
    rectMode(CENTER);
    fill(255);
    rect(buttonX, buttonY, 100, 50);

  }

}


function mouseClicked(){
  
  
  // if (bet <= money){
  //   placeBet();
  // }
 
}

let tower = {
  
};