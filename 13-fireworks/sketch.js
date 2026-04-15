// Fireworks OOP

class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5,5);
    this.radius = 5;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.opacity = 255;
  }

  update(){
    //move
    this.x += this.dx;
    this.y += this.dy;

    this.opacity -=2;
  }
  display(){
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius);
  }


  
}

theFireworks = [];
const NUMBER_OF_FIREWORKS_PER_CLICK = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let someFirework of theFireworks){
    someFirework.update();
    someFirework.display();
  }
}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++){
    let aFirework = new Particle(mouseX, mouseY);
    theFireworks.push(aFirework);
  }

}
