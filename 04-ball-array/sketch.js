//Ball Array Demo

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);

  for (let ball of ballArray){
    //move
    ball.x += ball.dx;
    ball.y += ball.dy;
    if(ball.x > width){
      ball.x = 0;
    }
    if(ball.x < 0){
      ball.x = width;
    }
    if(ball.y > height){
      ball.y = 0;
    }
    if (ball.y < 0){
      ball.y = height;
    }
    
    //display
    fill(ball.r, ball.g, ball.b);
    circle(ball.x, ball.y, ball.radius *2);
  }
}

function mousePressed(){
  spawnBall(mouseX, mouseY);
}


function spawnBall(_x, _y){
  let someBall = {
    x: _x,
    y: _y,
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 30),
    r: random(0,255),
    g: random(0,255),
    b: random(0,255),
  };
  ballArray.push(someBall);
}
