// Recursive Circles Demo


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawCircle(width/2, width/2);
}

function drawCircle(x, radius){
  fill(radius);
  circle(x, height/2, radius * 2);

  if (radius > 0.2){
    drawCircle(x - radius/2, radius/2);
    drawCircle(x + radius/2, radius/2);
  }
}

