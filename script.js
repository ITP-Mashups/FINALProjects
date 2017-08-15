//Get cooper hewitt api response

function getCooperHewittResponse(date, callback) {


  var url = 'https://api.collection.cooperhewitt.org/rest/?method=cooperhewitt.search.collection&access_token=ee4c348870e1913e53b7f579832734b0&per_page=20&query=';

  console.log(url);
  $.getJSON(url + date, function(data){
 		callback(data);
    });
}

 function init (){
 	document.querySelector("button").addEventListener("click", function(){
 		var date = document.querySelector("input").value;
 		if (!date || date ==="") return;
 		getCooperHewittResponse(date, handleData);
	 });
}

//img gallery

function handleData (data){

	var html = "<div class='fotorama'\
						data-width = '700'\
						data-height = '700' \
						data-allowfullscreen='true'\
						data-nav='thumbs'\
						data-autoplay='true'\
						data-transition='crossfade'>";

	for (var i=0; i<data.objects.length; i++){
		var item = data.objects[i];
		html += "<figcaption>" + item.title +"</figcaption>";
		html += "<img id='img"+i+"' src='"+item.images[item.images.length-1].sq.url+"'>";
	}

	html += "</div>";

	document.querySelector("output").innerHTML=html;
	$(".fotorama").fotorama();	
}

// p5

// var rSlider, gSlider, bSlider;
// var makeSwatch;

// function setup() {
//   createCanvas(800, 601);
//   background(255);
//   fill(0);
//   rSlider = createSlider(0, 255, 100);
//   rSlider.position(620,20);
//   gSlider = createSlider(0, 255, 0);
//   gSlider.position(620, 50);
//   bSlider = createSlider(0, 255, 255);
//   bSlider.position(620, 80);
  
//  stroke(150);
//  strokeWeight(1);
 
// beginShape();
//   for (var x = 0; x <=600; x = x + 20) {
//   line (x, 0, x, 600);
//  }
//   for (var y = 0; y <=600; y = y + 20 ){
//   line (0, y, 600, y);
//  }
// endShape(); 
// noLoop();
// mouseDragged();

// }

// function mouseDragged(){
//   var r = rSlider.value();
//   var g = gSlider.value();
//   var b = bSlider.value();
//   fill(r,g,b);
//   text ("r", 610, 32);
//   text ("g", 610, 62);
//   text ("b", 610, 92);
//   rect (620,120, 40, 40);
// }

// function mouseClicked(){
//  if (mouseX>600 || mouseY>600 ) return;  
//  var x = (Math.floor(mouseX/20))*20;
//  var y = (Math.floor(mouseY/20))*20;
//  rect(x, y, 20,20);
 
// }


 