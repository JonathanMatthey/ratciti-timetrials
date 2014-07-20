// set variables for environment
var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    logger = require('mean-logger'),
    port = 4000;

// phantomjs requirements
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middleware/authorization'),
    mongoose = require('mongoose');

//Bootstrap db connection
var db = mongoose.connect(config.db);
require('./config/preload_models')(mongoose, fs);

// require('./config/passport')(passport);              // bootstrap passport config
var app = express();
app.locals.moment = require('moment');
require('./config/express')(app, function(){return true;}, db, auth); // express settings
require('./config/routes')(app, function(){return true;}, auth);      // UI routes

//Start the app by listening on <port>
var port = process.env.PORT || config.port;
app.listen(port);
console.log('Express app started on port ' + port);

//Initializing logger
logger.init(app, function(){return true;}, mongoose);

//expose app
exports = module.exports = app;


// // set routes
// app.get('/test', function(req, res) {

//   console.log("save test trip");
//   var trip1 = new Trip({
//     trip_id: '12312321'
//   });
//   console.dir(trip1);
//   trip1.save(function(err, trip) {
//     if (err) return console.error(err);
//     console.dir(trip);
//   });
// });


// // set routes
// app.get('/trips', function(req, res) {

//   console.log('running ph_scrape_trips script');
//   var childArgs = [
//     path.join(__dirname, 'ph_scrape_trips.js'),
//     ''
//   ]

//   childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
//     // handle results
//     console.log('------------------------');
//     console.log('err: ' +err);
//     console.log('------------------------');
//     console.log('stdout: ' +stdout);
//     console.log('------------------------');
//     console.log('stderr: ' +stderr);
//     console.log('------------------------');
//   })

// });
