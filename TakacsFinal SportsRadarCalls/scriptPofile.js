    // var theSeason = data.player.seasons[b].id;
//     var theHits = data.player.seasons[b].totals.statistics.hitting.overall.onbase.h;
     var theHRs = 18;
     var theHits = 122;
     var theStrikes = 52;
     var theRBI = 70;
     var theDbl = 32;
     var theSB = 17;
     var theCS = 3;
     var theOBPS = 0.801;
     var theOBP = 0.343;
     var totalABs = 454;
     var theAvg = 0.269;
     var ball = [];

     var stolen;
     var caught;
     var boston;
     var imGood;
     var neverDone;
     var strikeOut;
//     var battingAvg2 = data.player.seasons[b].totals.statistics.hitting.overall.avg;

function preload(){
  	stolen = loadSound('ItsMine.wav');
	caught = loadSound('CaughtStealing.wav');
	boston = loadSound('DirtyWater.wav');
	strikeOut = loadImage('strike3.png');
	// imGood = loadSound('ImGood.wav');
	neverDone = loadSound('WetDreamzClip.wav');
}

function setup() {

  	stolen = loadSound('ItsMine.wav');
	caught = loadSound('CaughtStealing.wav');
	boston = loadSound('DirtyWater.wav');
	createCanvas(800, 500);
	// imGood = loadSound('ImGood.wav');
	neverDone = loadSound('WetDreamzClip.wav');
  // noStroke();

}

function draw() {
  background(10, 10, 41);

  push();
  fill(255);
  textSize(15);
  // textStyle(BOLD);
  textFont("Cambria");
  text("Homeruns       " + theHRs, 30, 50);
  text("Doubles            " + theDbl, 30, 80);
  text("Strikeouts        " + theStrikes, 30, 110);
  push();
  textSize(20);
  textStyle(BOLD);
  text("Hits        " + theHits, 30, 150);
  pop();

  text("Stolen Bases                   " + theSB, 30, 210);
  text("Caught Stolen Bases      " + theCS, 30, 230);

  text("On Base Plus Slugging      " + theOBPS, 30, 300);
  text("On Base Percentage          " + theOBP, 30, 320);
  text("Runners Batted In       " + theRBI, 30, 350);

  push();
  textSize(20);
  textStyle(BOLD);
  text("Total At Bats:     "  + totalABs, 70, 440);
  text("2017 Batting Average:    " + theAvg, 100, 470);
  pop();

  pop();

  push();
  fill(255, 255, 255, 20);
  noStroke();
  rect(20, 130, 760, 30, 15);
  pop();

  push();
  playBall(30, 45, 10);
  playBall(30, 75, 10);
  playBall(30, 105, 10);


  playBall(40, 145, 20);
  playBall(40, 205, 20);
  playBall(40, 225, 20);
  playBall(40, 345, 20);
  pop();

  for (var i = 0; i < theHRs; i++) {
      hrBall(i * 5 + 170, 45, 15);
  }

  for (var d=0; d< theDbl; d++){
  	hrBall(d*5 + 290, 75, 15);
  }

  for (var s = 0; s < theStrikes; s++){
  	hrBall(s*5 + 480, 105, 15);
  }

   for (var p = 0; p < theHits; p++){
  	hrBall(p * 5 + 160, 145, 15);
  }

  for (var b = 0; b < theRBI; b++){
  	hrBall(b * 6 + 250, 345, 15);
  }

  for (var t = 0; t < theSB; t++){
  	allAboutThatBase(t*20 +250, 195, 15);
  }

  for (var j = 0; j < theCS; j++){
  	allAboutThatBase(j*20 +250, 215, 15);
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 50){
  	hrBall(mouseX, mouseY, 50);
  	star(mouseX, mouseY, 80, 100, 90); 
 	for (var k = 0; k < theHRs; k++){
  		ellipse(k + random(50,800), k + random(50,500), 20, 20);
  	}
  	
  }

  if (mouseX > 0 && mouseX < 100 && mouseY > 55 && mouseY < 80){
  	allAboutThatBase (mouseX-25, mouseY-25, 50);
  	hrBall(mouseX, mouseY, 50);
  	for (var u = 0; u < theRBI; u++){
  		rect(u + random(50,800), u + random(50, 500), 20, 20);
  	}
  	// star(mouseX, mouseY, 80, 100, 90);
  }

  if (mouseX > 0 && mouseX <100 && mouseY > 85 && mouseY < 110){
  	strikeBall(mouseX, mouseY, 50);
  	tint(255, 255, 255, 50);
  	image(strikeOut, 0, 0, width, height);

  }

	if (mouseX > 0 && mouseX < 100 && mouseY > 130 && mouseY < 150){
		if (!boston.isPlaying()){
		boston.play();
		}
	}

    if (mouseX > 0 && mouseX < 170 && mouseY > 180 && mouseY < 200){
    	if (!stolen.isPlaying()){
    	stolen.play();
    	}
	}

    if (mouseX > 0 && mouseX < 170 && mouseY > 210 && mouseY < 230){
    	// caught.play();
    	if (!caught.isPlaying()){
    		caught.play();
    	}
	}

	if (mouseX > 0 && mouseX < 170 && mouseY > 330 && mouseY < 355){
		if (!neverDone.isPlaying()){
			neverDone.play();
		}
	}



}


//Function to make AJAX call
function getSportsData() {

    var mlbURL = "http://api.sportradar.us/mlb-t6/players/084d2514-9ffb-414e-ae16-3bc690aaad51/profile.json?api_key=";
    var mlbAPIKey = "whd444qawmtaj6yxj2wan6vt";
    var mlbReqURL = mlbURL + mlbAPIKey;

	$.ajax({
		url: mlbReqURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("We got problems");
			console.log(data.status);
		},
		success: function(data){
			console.log("WooHoo!");
			console.log(data);

			var totalABs = data.player.seasons[0].totals.splits.hitting.overall[0].total[0].ab;
			var theHRs = data.player.seasons[0].totals.statistics.hitting.overall.onbase.hr;
			var theHits = data.player.seasons[0].totals.splits.hitting.overall[0].total[0].h;
			var theStrikes = data.player.seasons[0].totals.splits.hitting.overall[0].total[0].ktotal;
			var theRBI = data.player.seasons[0].totals.splits.hitting.overall[0].total[0].rbi;
			var theDbl = data.player.seasons[0].totals.statistics.hitting.overall.onbase.d;

			$('#totalABs').html(totalABs + ' Total At Bats');
			$('#totalHits').html(theHits + "    hits");
			$('#totalStrikes').html(theStrikes + "  strikes");
			$('#totalHR').html(theHRs + ' homeruns');
			$('#totalDbls').html(theDbl + '    doubles');
			$('#totalRBI').html(theRBI + "  runs batted in");

			//SVG BASED DRAWING
			// drawHR(theHRs);
		}
	});
}

$('document').ready(function(){
	getSportsData();
});


function hrBall( x, y, diameter){
      stroke(0, 0, 77, 90);
      fill(153, 153, 255, 80);
      ellipse(x, y, diameter, diameter);
}

function allAboutThatBase(x2, y2, side){
	stroke(0, 0, 77, 90);
	fill(153, 153, 255, 80);
	rect(x2, y2, side, side, 2);

}

function strikeBall( x3, y3, diameter2){
      stroke(77, 0, 0, 90);
      fill(255, 153, 153, 80);
      ellipse(x3, y3, diameter2, diameter2);
      star(x3, y3, 10, 30, 2);
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function playBall(p1, p2, size){
	stroke(0, 77, 0, 90);
    fill(0, 128, 0, 80);
	triangle(p1-size, p2-size, p1, p2, p1-size, p2+size);
}







