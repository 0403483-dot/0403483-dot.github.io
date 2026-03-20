// rectangular grid array demo

const CELL_SIZE = 100;
let grid;
let rows;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
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
        newGrid[y][x] = 1;
      }
      else {
        newGrid[y][x]= 0;
      }
      
    }
  }
  return newGrid;
}

function drawGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if(grid[y][x] === 0){
        fill("white");
      }
      if(grid[y][x] === 1){
        fill("black");
      }
      square(x *CELL_SIZE, y* CELL_SIZE, CELL_SIZE);
    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);

  toggleCell(x + 1, y);
  toggleCell(x, y + 1);
  toggleCell(x - 1, y);
  toggleCell(x, y -1);
}


function toggleCell(x, y){
  //make sure the cell actually exists

  if (x >= 0 && x < cols && y >= 0 && y < rows){
    if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0){
      grid[y][x] = 1;
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
}

function generateEmptyGrid(){
  let newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      newGrid[y].push(0);
      
    }
  }
  return newGrid;
}