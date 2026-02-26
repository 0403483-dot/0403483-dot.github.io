// Image Demo

let pooyanImg;

function preload(){
  pooyanImg = loadImage("pooyan.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  image(pooyanImg, mouseX, mouseY, pooyanImg.width*6, pooyanImg.heightx11*1.5);
}
