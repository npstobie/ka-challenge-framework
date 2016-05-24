var express = require('express'),
		tester = require('./modules/tester.js'),
		blackList = require('./modules/blackListTest.js'),
		whiteList = require('./modules/whiteListTest.js'),
		structure = require('./modules/structureTest.js'),
    app = express(),
		bodyParser = require('body-parser'),
    port = 3000;

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '../../client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

// only endpoint the client is currently hitting checks for
// whiteList, blackList, and structure all in a single request
app.post('/checkJS', function(req, res){
	var result = tester.testText(req.body);
	res.status(200).send(result);
});

// checks only the blacklist of text in the editor
app.post('/checkBlackList', function(req, res){
	var result = blackList.blackListTest(req.body);
	res.status(200).send(result);
});

// checks only the whitelist of text in the editor
app.post('/checkWhiteList', function(req, res){
	var result = whiteList.whiteListTest(req.body);
	res.status(200).send(result);
});

// checks only for proper structure of text in the editor
app.post('/checkStructure', function(req, res){
	var result = structure.structureTest(req.body.checks, req.body);
	res.status(200).send(result);
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});