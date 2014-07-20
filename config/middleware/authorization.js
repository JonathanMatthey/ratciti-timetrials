var tripModel = require('../../app/models/trip'),
     mongoose = require('mongoose'),
         Trip = mongoose.model('Trip');

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        // return res.send(401, 'User is not authorized');
        return res.redirect('/signin');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
  hasAuthorization: function(req, res, next) {
    if (req.profile.id != req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
  }
};
