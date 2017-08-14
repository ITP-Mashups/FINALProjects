var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('static'));
app.use(urlencodedParser);

app.get('/', function(req, res){
	res.sendFile('index.html', {root: './'});
});
app.get('/index.html', function(req, res){
	res.sendFile('index.html', {root: './'});
});


app.listen(8081);