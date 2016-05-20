var express = require('express'),
		tester = require('./modules/tester.js'),
		whitelist = require('./modules/whitelist.js'),
		blacklist = require('./modules/blacklist.js'),
		structure = require('./modules/structure.js'),
    app = express(),
		bodyParser = require('body-parser'),
    port = 3000;

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '../../client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.post('/checkJS', function(req, res){
	var asdf = tester.testText(req.body);
	console.log(asdf, "HEYEYEYEYEYEYEY")
	res.status(200).send(asdf);
})

// app.post('/whitelist', function(req, res) {
// 	res.send(whitelist.checkWhitelist(req.body));
// })

// app.post('/blacklist', function(req, res) {
// 	res.send(blacklist.checkBlacklist(req.body));
// })

// app.post('/structure', function(req, res) {
// 	res.send(structure.checkStructure(req.body));
// })

app.listen(port, function() {
  console.log('Listening on port ' + port);
});