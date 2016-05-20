var express = require('express'),
		tester = require('./modules/tester.js'),
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
	res.status(200).send(asdf);
})

app.listen(port, function() {
  console.log('Listening on port ' + port);
});