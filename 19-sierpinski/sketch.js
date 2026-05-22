// Sierpinski triangle demo

let initialTriange = [
  {x: 1000, y: 25},
  {x: 400, y: 900},
  {x: 1650, y: 900},
];
let theDepth = 0;
let theColors = ["red", "purple", "cyan", "green", "yellow", "blue", "pink", "brown", "orange"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  sierpinski(initialTriange, 0);
}

function draw() {

}


function mousePressed(){

  if( theDepth < 8){
    theDepth ++;
    background("white");
    sierpinski(initialTriange, theDepth);
  }
}

function sierpinski(points, depth){
  fill(theColors[depth]);

  triangle(points[0].x, points[0].y,
    points[1].x, points[1].y,
    points[2].x, points[2].y,
  );

  //base case
  if (depth > 0) {
    //top triangle
    sierpinski([points[0],
                  midpoint(points[0], points[1]),
                  midpoint(points[0], points[2])],
                  depth - 1);

    sierpinski([points[1],
                  midpoint(points[0], points[1]),
                  midpoint(points[1], points[2])],
                  depth - 1);

    sierpinski([points[2],
                  midpoint(points[0], points[2]),
                  midpoint(points[1], points[2])],
                  depth - 1);                
  }
}

function midpoint(point1, point2){
  let midX = (point1.x + point2.x) / 2;
  let midY = (point1.y + point2.y) / 2;
  return {x: midX, y: midY};
}