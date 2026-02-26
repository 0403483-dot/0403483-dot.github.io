let money = 1000;
let bet = 25;
let betMax = 500;
let betMin = 25;
let spinning = false;
let spinStartTime = 0;
let delay = 4000;


function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
  background(0);
  text("Money $" + money, width - 1000, 50);
  fill(200, 150, 0);
  textSize(15);
  text("Bet:"+ bet, width -1000, 25);
  fill(200, 150, 0);
  textSize(15);
  textStyle(BOLD);

  spinDelay();



}


//when the mouse is clicked, place the users bet
function mouseClicked(){ 
  placeBet();
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
  else if (odds >= 900){ // normal win pays out 2x, but is rigged
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
  if (event.delta < 0 && bet < betMax){ // can't bet over $500
    bet+=5;
  }
  else if(event.delta > 0 && bet > betMin){ // can't bet under $25
    bet -=5;
  }

  return false; // so that the screen doesn't scroll when the mouse wheel scrolls.
}

function spinDelay(){
  if (spinning && millis() - spinStartTime >= delay){
    randomOdds();
    spinning = false;
  }
}

