var path = require('path');
// phantomjs requirements
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path;

module.exports = function(app, passport, auth) {

    // Trips Routes
    var trips = require('../app/controllers/trips');
    app.get('/trips2', function(req, res) {
      res.render('trips/index');
    });
    app.get('/trips', trips.index);
    app.get('/trips/create', trips.create);
    // app.get('/trips/:projectId', auth.requiresLogin, trips.show);
    // app.get('/trips/:projectId/preview',  auth.requiresLogin, trips.preview);
    // app.post('/trips/:projectId/metadata', auth.requiresLogin, trips.update);
    // app.delete('/trips/:projectId', auth.requiresLogin, trips.destroy);
    // app.post('/trips/:projectId/deploy', auth.requiresLogin, trips.deploy);
    // app.get('/trips/:projectId/preview', auth.requiresLogin, trips.preview);

    // set routes
    app.get('/', function(req, res) {
      res.render('index');
    });

    app.get('/scrape', function(req, res) {
      console.log('Scraping citibike.com');
      var childArgs = [
        path.join(__dirname, '../ph_scrape_trips.js'),
        ''
      ];


      childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        console.log('STARTED');
        // handle results
        var tripsArr = stdout.split("~~~");
        process.stdout.write("Adding " + tripsArr.length + "Trips to DB ");
        for(var j = 0; j < tripsArr.length; j++){
          var tripVals = tripsArr[j].split("|||");
          trips.createTrip({
              "trip_id":tripVals[0],
              "start_station":tripVals[1],
              "end_station":tripVals[3],
              "start_time":tripVals[2],
              "end_time":tripVals[4],
              "duration":tripVals[5]
          })
          process.stdout.write(".");
        }
        console.log('DONE -- Adding trips')
      });
    });

};
