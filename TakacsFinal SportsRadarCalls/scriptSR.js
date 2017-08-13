

var app = {
  initialize: function() {
    app.getSportsData();
  },

  getSportsData: function() {
    console.log("Getting MLB Data");

    var mlbURL = "http://api.sportradar.us/mlb-t6/players/084d2514-9ffb-414e-ae16-3bc690aaad51/profile.json?api_key=";
    var mlbAPIKey = "whd444qawmtaj6yxj2wan6vt";
    var mlbReqURL = mlbURL + mlbAPIKey;

    $.ajax({
      url: mlbReqURL,
      type: 'GET',
      dataType: 'json',
      error: function(err){
        console.log(err);
      },
      success: function(data){
        console.log("Got the data");
        console.log(data);
        var theTeam = data.player.team.name;
        var thePlayer = data.player.full_name;
        var theNumber = data.player.jersey_number;
        var birthDay = data.player.birthdate;
        var birthCity = data.player.birthcity;
        var birthState = data.player.birthstate;
        var birthCountry = data.player.birthcountry;
        var currentPosition = data.player.position;
        var primaryPosition = data.player.primary_position;
        var debutDate = data.player.pro_debut;
        var battingHand = data.player.bat_hand;


        // var battingAvg = data.player.seasons[0].totals.statistics.hitting.overall.avg;
        // var theImage = PapiBetts.jpg;
        // console.log(thePlayer);

        $("#reqObject").text("MLB!" + " Team: " + theTeam);
        $("#playerName").text("Player: " + thePlayer);
        $("#playerNumber").text("Jersey Number: " + theNumber);
        $("#birthDate").text("Birthday: " + birthDay);
        $("#birthPlace").text("Birthplace: " + birthCity + ", " + birthState + ", " +birthCountry);
        $("#debutDate").text("Major League Debut Date: " + debutDate);
        $("#playerPosition").text("Position: " + currentPosition);
        $("#primaryPosition").text("Primary Fielding Position: " + primaryPosition);
        $("#battingHand").text("Batting/Throwing Hand: " + battingHand);
        // $("#bAvg").text("Overall Batting Average: " + battingAvg);

        // Clear out the container
        $('#new-container').html("");
      }
    });
  }

  //called every time the window is resized
  //function windowResized(){
   // resizeCanvas(windowWidth, windowHeight);
  //}

//   getFlickrData: function(theBettsPic) {
//     console.log("Get Flickr Data");

//     var theTerm = 'Mookie Betts';

//     var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
//     var flickrKey = '5885177448fbc77518029151b59bcd46';
//     var flickrQueryParams = '&text=' + theTerm + '&format=json&nojsoncallback=1&extras=url_o';
//     var flickrReqURL = flickrURL + flickrKey + flickrQueryParams;

//     $.ajax({
//       url: flickrReqURL,
//       type: 'GET',
//       dataType: 'json',
//       error: function(err){
//         console.log(err);
//       },

//       success: function(data){
//         console.log("Got the data");
//         // console.log(theBettsPic.apod_title);
//         console.log(data);

//         var randomImgNum = Math.floor(Math.random() * 100);

//         var theImage = data.photos.photo[randomImgNum].url_o;
//         var theImageTitle = data.photos.photo[randomImgNum].title;

//         console.log(randomImgNum);
//         if (data.photos.photo[randomImgNum]){
//           if (data.photos.photo[randomImgNum].url_o){
//             theImage = data.photos.photo[randomImgNum].url_o;
//             theImageTitle = data.photos.photo[randomImgNum].title;
//           }
//         }
//         console.log(theImage);

//         app.makeHTML(theImageTitle, theImage);



//       }
//     });
//   }, 

//   makeHTML: function(theImageTitle, theImageURL) {
//     var htmlString = '<div class="flickr-box">';
//     htmlString += '<h1>' + theImageTitle + '</h1>';
//     htmlString += '&nbsp';
//     htmlString += '<img  src="' + theImageURL + '">';
//     htmlString += '</div>';


//     $('body').append(htmlString);

//    


//   }, 
};









