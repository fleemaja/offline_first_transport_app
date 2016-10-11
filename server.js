// Load the http module to create an http server.
var https = require('https');
var express = require('express');
var routes = require('./routes/index.js');

var app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(process.cwd() + '/public'));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});


