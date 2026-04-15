//walker OOP demo

class Walker {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.diameter = 2;
    this.color = "red";
    this.speed = 5;
  }

  display(){
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50){
      //down
      this.y += this.speed;
    }
    else if (choice < 75){
      this.x -= this.speed;
    }
    else if (choice <=100){
      this.x += this.speed;
    }
  }
}


let theWalkers = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  for (let someWalker of theWalkers){
    someWalker.move();
    someWalker.display();
  }
}

function mousePressed() {
  let theGuy = new Walker(mouseX, mouseY);
  theGuy.color = color(random(255), random(255), random(255));
  theWalkers.push(theGuy);

}






















// let tyler;
//let thomas;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   tyler = new Walker(width/2, height/2);
//   thomas = new Walker(300, 500);
//   thomas.color = "blue";
// }

// function draw() {
//   tyler.display();
//   tyler.move();
//   thomas.display();
//   thomas.move();
// }
