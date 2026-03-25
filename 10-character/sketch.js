// character in grid demo

const CELL_SIZE = 100;
const OPEN_TILE = 0;
const IMPASSIBLE = 1;
const PLAYER = 9;

let grid;
let rows;
let cols;

let thePlayer = {
  x: 0,
  y: 0,
};

function preload(){
  pooyan = loadImage("pooyan.jpg");
  saffron = loadImage("saffron.webp");
  shawarma = loadImage("shawarma.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  //add player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
  pooyan.resize(CELL_SIZE, CELL_SIZE);
  saffron.resize(CELL_SIZE, CELL_SIZE);
  shawarma.resize(CELL_SIZE, CELL_SIZE);
}

function draw() {
  background(220);
  drawGrid();
}

function generateRandomGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      if (random(100) < 50){
        newGrid[y][x] = IMPASSIBLE;
      }
      else {
        newGrid[y][x]= OPEN_TILE;
      }
      
    }
  }
  return newGrid;
}

function drawGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){

      if(grid[y][x] === OPEN_TILE){
        image(shawarma, x *CELL_SIZE, y* CELL_SIZE);
      }
      else if(grid[y][x] === IMPASSIBLE){
        image(saffron, x *CELL_SIZE, y* CELL_SIZE);
      }
      else if(grid[y][x] === PLAYER){
        image(pooyan, x *CELL_SIZE, y* CELL_SIZE);
      }

    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);


}


function toggleCell(x, y){
  //make sure the cell actually exists

  if (x >= 0 && x < cols && y >= 0 && y < rows){
    if (grid[y][x] === IMPASSIBLE){
      grid[y][x] = OPEN_TILE;
    }
    else if (grid[y][x] === OPEN_TILE){
      grid[y][x] = IMPASSIBLE;
    }
  }
 
}

function keyPressed(){
  if (key === "r"){
    grid = generateRandomGrid(cols, rows);
  }
  if (key === "e"){
    grid = generateEmptyGrid(cols, rows);
  }
  if (key === "s"){
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "w"){
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "a"){
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === "d"){
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function generateEmptyGrid(){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      newGrid[y].push(OPEN_TILE);
      
    }
  }
  return newGrid;
}

function movePlayer(x,y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE){

    let oldX = thePlayer.x ;
    let oldY = thePlayer.y;

    thePlayer.x = x;
    thePlayer.y = y;

    grid[thePlayer.y][thePlayer.x] = PLAYER;

    grid[oldY][oldX] = OPEN_TILE;

  }
}