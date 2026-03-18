// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize;

let theGrid =[[0, 0, 1, 0],
              [1, 0, 1, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 1]];


const SQUARE_DIMENTSIONS = theGrid.length;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  if(width <height){
    cellSize = width/SQUARE_DIMENTSIONS;
  }
  else{
    cellSize = height/SQUARE_DIMENTSIONS;
  }
}

function draw() {
  background(220);
  showGrid();

}



function showGrid(){
  for (let y =0; y < SQUARE_DIMENTSIONS; y++){
    for (let x = 0; x < SQUARE_DIMENTSIONS; x++){
      if (theGrid[y][x] === 1){
        fill("black");
      }
      if (theGrid[y][x] === 0){
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
    

  }
}

function mouseClicked(){
  
}