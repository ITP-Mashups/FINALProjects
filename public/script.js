// include libraries

var socket = io();
var spotifyURI = "";
var playerContent = "";
var contentID = "";

// messenger string variables
var message = "";
var username = "";
var searchTerm = "";

// sounds
var logon_tone = new Howl({
  src: ['/assets/logon.wav']
});
var logout_tone = new Howl({
  src: ['/assets/logout.wav']
});
var msg_tone = new Howl({
  src: ['/assets/msg.wav']
});

// message submit and tag search fn def
function messageSubmit() {
	// username
	var username = $('#username').val();
	// message
	var message = $('#chatInput').val()

	// remove tags and identify search term
    if (message.split("~").length === 3) {
    	
    	// parse message for tagged term
    	message = message.split("~");
    	searchTerm = message[1];

    	// reassemble message without search term and tags
    	message = message[0] + ' <b>' + message[1] + '</b> ' + message[2];
    	
    	// send search to server
		socket.emit('search', 
		{
			searchTerm: searchTerm,
			message: message,
			username: username,
		});
    } else {
		
		// sent plain chat to server
		socket.emit('chat to server', 
		{
			username: username,
			message: message,
		});
	}

    $('#chatInput').val('');
}

// track users
socket.on('logon', function(data){
    if (data.userCount === 1) {
    	d3.select('#userCount').html(data.userCount + ' user present');
    } else {
    	d3.select('#userCount').html(data.userCount + ' users present');
    }
    logon_tone.play();
});
socket.on('logout', function(data){
    if (data.userCount === 1) {
    	d3.select('#userCount').html(data.userCount + ' user present');
    } else {
    	d3.select('#userCount').html(data.userCount + ' users present');
    }
    logout_tone.play();
});

// send a chat msg via click
$("#chatSend").click(function(){
	messageSubmit();
});

// send a chat msg via ENTER
$("#chatInput").keypress(function(e){
	// Listen for enter key
	if (e.which == 13){
		// trigger chatSend click
		$("#chatSend").trigger('click');
	}
});

// receive msg and update list
socket.on('chat to client', function(data){

	message = data.message;
	username = data.username;

    // post message
    $('.messages').append($('<li>').html('<i>' + username + ": " + '</i>' + message));	
    msg_tone.play();

	// failing rectangle formatting concept
	// $('.messages').append($('<svg>').html('<rect width="482" height="50" rx="5"/>'));
    
    // d3.selectAll('li').style("color", function(d, i) {
    // 		return i % 2 ? "#010101" : "#464646";
	// });
});

// catch complete search and update msg and player
socket.on('searchComplete', function(data){
	// receive and log ID
	contentID = data.contentID;
	var message = data.message;
	var username = data.username;

	console.log("received data = ", contentID);
	
	// create new embed URL
	playerContent = "<iframe id = \"player\" src=\"https://open.spotify.com/embed?uri=" + contentID + "\" width=\"300\" height=\"80\" frameborder=\"0\" allowtransparency=\"true\"></iframe>";

	// post message with player
	$('.messages').append($('<li>').html('<i>' + username + ": " + '</i>' + message));
    $('.messages').append(playerContent);  
    msg_tone.play();

    // auto scroll
	
});






