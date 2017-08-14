 /*
 * Authorization flow adapted from jmperez:
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 * https://github.com/spotify/web-api-auth-examples/blob/master/client_credentials/app.js
 */

// clientId: 'f9078bb1105f4dc7855c763db36c646a', clientSecret: 'b43e1d39a6464daea57eec1ccd38eda3'
// tha carter III album uri - spotify:album:5BGzOpea6At0Nd7tYtYZOP

// include required libraries
var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var io = require('socket.io')(http);

// express setup
app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/session/:name', function(req, res){
  res.send('ayeeee '+req.params.name);
});

// global variables
var contentID = "";
var userCount = 0;
var status = 0;

function searchSpotify(searchTerm, message, username) {

  // spotify deets
  var client_id = 'f9078bb1105f4dc7855c763db36c646a';
  var client_secret = 'b43e1d39a6464daea57eec1ccd38eda3';

  // create URL from search term
  var cleanSearchTerm = searchTerm.replace(" ", "%20");
  var searchURL = 'https://api.spotify.com/v1/search?q=' + cleanSearchTerm + '&type=track';

  // authorization request
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  console.log('Making request!');

  // spotify request for content ID
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: searchURL,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      
      request.get(options, function(error, response, body) {
        if (!error && response.statusCode === 200 && (typeof body.tracks.items[0] === 'object')) {
          console.log("typeof: " + typeof body.tracks.items[0].uri)
          // capture content ID
          contentID = body.tracks.items[0].uri;
          console.log('content ID acquired: ', contentID);
          
          // send results via socket    
          io.emit('searchComplete', 
          {
            contentID: contentID,
            message: message,
            username: username,
          });
        } else {
          // record error, do nothing
          console.log(typeof body.tracks.items[0]);
          console.log("Invalid search term.")
        }
      });
    }
  });

}

// socket connection
io.on('connection', function(socket){
  console.log('A user connected');

  // update user count
  userCount += 1;
  console.log('Active users: ', userCount);
  // send results via socket    
  io.emit('logon', 
  {
    userCount: userCount,
  });


  //Send a message after a timeout of 4seconds
  setTimeout(function(){
    socket.send('Sent a message 4seconds after connection!');
  }, 4000);
  
  // socket disconnection
  socket.on('disconnect', function () {
    console.log('A user disconnected');
    
    // update user count
    userCount -= 1; 
    console.log('Active users: ', userCount);
    // send results via socket    
    io.emit('logout', 
    {
      userCount: userCount,
    });
  });

  // SEARCH EVENTS //

  // socket listener for searching by users
  socket.on('search', function(data){

    console.log('Search term: ', data.searchTerm);
    
    // capture message and username
    var message = data.message;
    var username = data.username;
    var searchTerm = data.searchTerm;
    // execute search
    searchSpotify(searchTerm, message, username);

  });

  // CHAT EVENTS //

  // msg to all users
  socket.on('chat to server', function(data){
    io.emit('chat to client', data); 
  });

});

// ip at home - 192.168.0.8:3323
http.listen(3323, '0.0.0.0', function(){
  console.log('listening on *:3323');
});



