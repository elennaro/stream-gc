var express = require('express');
var heapdump = require('heapdump');

var JSONStream = require('JSONStream');
var Counter = require('./counter');

var app = express();

app.get('/', function (req, res) {

	res.setHeader('Content-Type', 'text/html');

// Create the readable stream
	var stream = new Counter();
	console.log('AAAA', global.gc);
	global.gc();
	heapdump.writeSnapshot('./ss-' + Date.now() + '-begin.heapsnapshot');

	stream.on('end', function () {
		global.gc();
		console.log("DONNNNEEEE");
		heapdump.writeSnapshot('./ss-' + Date.now() + '-end.heapsnapshot');
	});

	stream.pipe(JSONStream.stringifyObject()).pipe(res);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});


module.exports = app;
