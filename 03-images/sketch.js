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

  image(pooyanImg, mouseX - pooyanImg.width/2, mouseY - pooyanImg.height/2, pooyanImg.width*6, pooyanImg.heightx11*1.5);
}
