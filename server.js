// Load the http module to create an http server.
var https = require('https');
var express = require('express');
var routes = require('./routes/index.js');

require('es6-promise').polyfill();

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.static(__dirname + '/'));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


