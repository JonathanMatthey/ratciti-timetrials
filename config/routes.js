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
};
