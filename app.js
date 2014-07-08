// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var port = 4000;

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
// use either 'jade' or 'ejs'
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));

// Displays server log in the CLI
app.use(express.logger());

// Set server port
app.listen(port);
console.log("Server is running at => http://localhost:" + port + "/\nCTRL + C to shutdown");

// set routes
app.get('/', function(req, res) {
  res.render('index');
});