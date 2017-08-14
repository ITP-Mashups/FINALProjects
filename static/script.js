//define containers for our elements
var searchField; var searchButton;
var poemDiv; var resultsDiv;

//define the base URL and format to hit the poetry and wolfram api with
var poetryURLbase = "http://poetrydb.org/title/";
var poetryURLformat = ":abs/title,lines,author.json";

//containers to store the data from the poetry api
var poem; var poemBody;

//rita specific things
var lexicon = new RiLexicon(); //rita lexicon
var ritaPoem = []; //poem that will be displayed after randomization
var checkAdj; var checkNns; var checkVbs; //containers for the checkboxes
var boolAdj; var boolNns; var boolVbs; //boleans that will be triggered by the checkboxes [possibly obsolete]
var randBtn;

//define the method that will be used to hit the poetryDB api
function poetryReq(){
	var poetryURL = poetryURLbase + searchField.value + poetryURLformat;
	console.log(poetryURL);

	$.ajax({
		url : poetryURL,
		type : 'GET',
		dataType : 'json',
		error : function(data){
			console.log(data.readyState);
			console.log("error: " + data.status);
		},
		success : function(data){
			//once data has been retrieved, paste it onto the poem and poembody containers for future use
			poem = {
				title : data[0].title,
				author : data[0].author,
				body : data[0].lines
			};
			poemBody = poem.body;

			//empty the app in case of a new query
			document.getElementsByClassName("poemDiv")[0].innerHTML = "";
			document.getElementsByClassName("resultsPoem")[0].innerHTML = "";

			//show the poem in poemDiv and resultsDiv
			$(".poemDiv").append("<p class = poemTitle>" + poem.title + ", " + poem.author + "</p>");
			$(".resultsPoem").append("<p class = poemTitle>" + poem.title + ", " + poem.author + "</p>");
			for(var i = 0; i < poem.body.length; i++){
				if(poem.body[i] === ""){
					$(".poemDiv").append("<br>");
					$(".resultsPoem").append("<br>");
				}
				else{
					$(".poemDiv").append("<p class = poemLine>" + poem.body[i] + "</p>");
					$(".resultsPoem").append("<p class = poemLine>" + poem.body[i] + "</p>");
				}
			}
			$(".resultsControls").fadeIn('slow');
		}
	});
};

//rita method to process a line of a poem and replace appropriate words
function ritaProcess(poemLine){
	var output = "";
	if(poemLine === ""){
		return output;
	}
	else{
		var rs = new RiString(poemLine);
	  	var words = rs.words();
	  	var pos = rs.pos();

	  	for(var i = 0; i < words.length; i++){
	    	if(/nn.*/.test(pos[i]) && checkNns.checked){
	      		output += lexicon.randomWord(pos[i]);
	    	}
	    	else if(/jj.*/.test(pos[i]) && checkAdj.checked){
	      		output += lexicon.randomWord(pos[i]);
	    	}
	    	else if(/vb.*/.test(pos[i]) && checkVbs.checked){
	      		output += lexicon.randomWord(pos[i]);
	    	}
	    	else{
	      		output += words[i];
	    	}
	    	output += " ";
	  	}
		return output;
	}
};

//method to run through a poem and randomize it
function generatePoem(){
	var outputPoem = [];
	for(var i = 0; i < poemBody.length; i++){
		outputPoem.push(ritaProcess(poemBody[i]));
	}
	return outputPoem;
};

//method that will be used to randomize a given poem and display it on screen
function randomizePoem(){
	ritaPoem = generatePoem();
	console.log(ritaPoem);
	$(".resultsPoem").empty();
	//code duplication, refactor?
	$(".resultsPoem").append("<p class = poemTitle>" + poem.title + ", " + poem.author + "</p>");
	for(var i = 0; i < ritaPoem.length; i++){
		if(ritaPoem[i] === ""){
			$(".resultsPoem").append("<br>");
		}
		else{
			$(".resultsPoem").append("<p class = poemLine>" + ritaPoem[i] + "</p>");
		}
	}
};

//callback function to fade in controls
function controlsFadeIn(){
	$(".resultsControls").fadeIn('slow');
};

//make sure that our document is loaded before we attach any event listeners or manipulate the page
window.addEventListener("load", function(){
	console.log("document loaded"); //document loaded

	//collect all the elements
	searchField = document.getElementsByClassName("searchField")[0];
	searchButton = document.getElementsByClassName("searchButton")[0];
	poemDiv = document.getElementsByClassName("poemDiv")[0];
	resultsDiv = document.getElementsByClassName("resultsDiv")[0];
	checkAdj = document.getElementById("checkAdj");
	checkNns = document.getElementById("checkNns");
	checkVbs = document.getElementById("checkVbs");
	randBtn = document.getElementById("randBtn");
	$(".resultsControls").fadeOut(0); //what the fuck have I done LMAO
	console.log("elements collected");

	//attach appropriate event listeners
	searchButton.addEventListener("click", function(){
		poetryReq();
	});
	randBtn.addEventListener("click", function(){
		randomizePoem();
	});
});