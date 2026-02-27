let money = 1000;
let bet = 25;
let betMax = 500;
let betMin = 25;
let spinning = false;
let spinStartTime = 0;
let delay = 3000;
let handleX = windowWidth*0.8;
let handleY = windowHeight/2;
let diameter = windowWidth*0.05;
let dragging = false;
let originalHandleY = windowHeight /2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}



function draw() {
  // background(0);
  text("Money $" + money, width - 1000, 50);
  fill(255, 150, 0);
  textSize(15);
  text("Bet:"+ bet, width -1000, 25);
  fill(200, 150, 0);
  textSize(15);
  textStyle(BOLD);
  spinDelay();
  drawSlotMachine();  

}


//function that will determine if you win or now with random odds
function randomOdds(){
  let odds = floor(random(1000)); // odds from 1-1000, using floor so that I only get integers
  
  if (odds === 999){ // jackpot, pays out 100x
    console.log("JACKPOT");
    money = money + 100*bet;
  }
  else if (odds >= 975){ // big win odds, pays out 25x
    console.log("BIG WIN");
    money = money + 25*bet;

  }
  else if (odds >= 900){ // normal win pays out 2x, but is highly rigged
    console.log("WIN");
    money = money + 2*bet;
  }
  else if (odds >= 600){ // breaking even
    console.log("Broke Even");
    money = money + bet;

  }
  else{
    console.log("bust"); //everything else will be a bust
  }


}

//function that places the users bet if they have enough money
function placeBet(){ 
  if(!spinning && bet<=money){
    money -= bet;
    spinning = true;
    spinStartTime = millis();
  }
  
  
  else if (money > bet){
    console.log("not enough funds");
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
  
function spinDelay(){ //adds the delay before getting your result for tension
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