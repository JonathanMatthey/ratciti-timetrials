// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var port = 4000;

// phantomjs requirements
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    mongoose = require('mongoose');

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

// set routes
app.get('/trips', function(req, res) {

  console.log('running ph_scrape_trips script');
  var childArgs = [
    path.join(__dirname, 'ph_scrape_trips.js'),
    ''
  ]

  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    // handle results
    console.log('------------------------');
    console.log('err: ' +err);
    console.log('------------------------');
    console.log('stdout: ' +stdout);
    console.log('------------------------');
    console.log('stderr: ' +stderr);
    console.log('------------------------');
  })

});
