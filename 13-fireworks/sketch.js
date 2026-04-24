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

  isDead(){
    return this.opacity <=0;
  }
  
}

theFireworks = [];
const NUMBER_OF_FIREWORKS_PER_CLICK = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let someFirework of theFireworks){
    if (someFirework.isDead()){
      //remove it
      let index = theFireworks.indexOf(someFirework);
      theFireworks.splice(index, 1);
    }
    else{
      someFirework.update();
      someFirework.display();
    }
  }
  // mousePressed();
}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++){
    let aFirework = new Particle(mouseX, mouseY);
    theFireworks.push(aFirework);
  }

}
