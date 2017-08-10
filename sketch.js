//p5

var rSlider, gSlider, bSlider;
var makeSwatch;

function setup() {
  createCanvas(800, 601);
  background(255);
  fill(0);
  rSlider = createSlider(0, 255, 100);
  rSlider.position(620,20);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(620, 50);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(620, 80);
  
 stroke(150);
 strokeWeight(1);
 
beginShape();
  for (var x = 0; x <=600; x = x + 20) {
  line (x, 0, x, 600);
 }
  for (var y = 0; y <=600; y = y + 20 ){
  line (0, y, 600, y);
 }
endShape(); 
noLoop();
mouseDragged();

}


function draw() {

function mouseDragged(){
  var r = rSlider.value();
  var g = gSlider.value();
  var b = bSlider.value();
  fill(r,g,b);
  text ("r", 610, 32);
  text ("g", 610, 62);
  text ("b", 610, 92);
  rect (620,120, 40, 40);
}

function mouseClicked(){
 if (mouseX>600 || mouseY>600 ) return;  
 var x = (Math.floor(mouseX/20))*20;
 var y = (Math.floor(mouseY/20))*20;
 rect(x, y, 20,20);
 
}

 