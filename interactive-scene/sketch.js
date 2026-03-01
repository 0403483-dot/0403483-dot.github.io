let money = 1000;
let bet = 25;
let betMax = 500;
let betMin = 25;
let spinning = false;
let spinStartTime = 0;
let delay = 3000;
let handleX;
let handleY;
let diameter;
let dragging = false;
let originalHandleY;
let result;
let gameState = "start";



function setup() {
  handleX = windowWidth*0.8;
  handleY = windowHeight/2;
  diameter = windowWidth*0.05;
  originalHandleY = windowHeight /2;
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function windowResized(){ 
  resizeCanvas(windowWidth, windowHeight); 

  handleX = windowWidth*0.8; // moves the handle when the window is resized
  originalHandleY= windowHeight / 2;
  diameter = windowWidth * 0.05;


}


function draw() {
  if (gameState === "start"){
    drawStartScreen();
  }
  else if (gameState === "playing"){
    background(0)
    drawText();
    spinDelay(); 
    drawSlotMachine();  
  }
  

}

function drawStartScreen(){
  background(0,0,100);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(60); 
  textStyle(BOLD)
  text("SLOTS MACHINE", windowWidth/2, windowHeight/2);

  textSize(40)
  text("Press SPACE to start!", windowWidth/2, windowHeight/2 + 100)
}

function keyPressed(){ 
  if (gameState === "start" && key === ' '){
    gameState = "playing"
  }
}

function drawText(){
  fill(0, 150, 0);
  textSize(25);
  text("Money $" + money, windowWidth*0.9, windowHeight* 0.05);
  
  textSize(25);
  fill(200, 150, 0);
  text("Bet:"+ bet, windowWidth*0.9, windowHeight*0.08);
  textStyle(BOLD);

  
  fill(255);
  text(result, windowWidth/2, windowHeight - 100);

}

//function that will determine if you win or now with random odds
function randomOdds(){
  let odds = floor(random(1000)); // odds from 1-1000, using floor so that I only get integers
  
  if (odds === 999){ // jackpot, pays out 100x
    money = money + 100*bet;
    result = "JACKPOT!!";
  }
  else if (odds >= 975){ // big win odds, pays out 25x

    money = money + 25*bet;
    result = "BIG WIN!";

  }
  else if (odds >= 900){ // normal win pays out 2x, but is highly rigged
    money = money + 2*bet;
    result = "WIN";
  }
  else if (odds >= 600){ // breaking even
    money = money + bet;
    result = "BROKE EVEN";

  }
  else{
    console.log("bust"); //everything else will be a bust
    result = "BUST";
  }


}

//function that places the users bet if they have enough money
function placeBet(){ 
  if(!spinning && bet<=money){
    money -= bet;
    spinning = true;
    spinStartTime = millis();
    result = "";
  }
  
  
  else if (money < bet){
    console.log("not enough funds");
    result = "Not Enough Funds";
  }

}


// function that changes the bet if the mouse wheel is scrolled up/down
function mouseWheel(event){  
  if (spinning === false){ //makes sure you can't change bet while the slots machine is spinning
    if (event.delta < 0 && bet < betMax){ // can't bet over $500
      bet+=5;
    }
    else if(event.delta > 0 && bet > betMin){ // can't bet under $25
      bet -=5;
    }

    return false; // so that the screen doesn't scroll when the mouse wheel scrolls.
  }

}
  
function spinDelay(){ //adds the delay before getting your result
  if (spinning && millis() - spinStartTime >= delay){
    randomOdds();
    spinning = false;
  }
}

function drawSlotMachine(){ //draws the rectangles that build the slots machine.
  
  fill(50);
  rect(windowWidth/2, windowHeight/2, windowWidth*0.5, windowHeight*0.6, 10);

  fill (255);
  rect(windowWidth/3, windowHeight/2, windowWidth*0.1, windowHeight* 0.4, 10);

  rect(windowWidth/2, windowHeight/2, windowWidth*0.1, windowHeight* 0.4, 10);

  rect(windowWidth/1.5, windowHeight/2, windowWidth*0.1, windowHeight* 0.4, 10);

  fill(255,0,0);
  circle(handleX, handleY, diameter);
  
}

function mousePressed(){
  let handleDist = dist(mouseX, mouseY, handleX, handleY);
  if (handleDist <= diameter/2){
    dragging = true;

  }
}

function mouseDragged(){ //keeps the mouse with the handle
  if (dragging){
    handleY = constrain(mouseY, originalHandleY, originalHandleY + 150);
  }
}

function mouseReleased(){
  if (dragging){
    dragging = false;

    // If pulled far enough, spin
    if (handleY > originalHandleY + 100){
      placeBet();
    }

    // Resets the lever
    handleY = originalHandleY;
  }
} 