// Routing for Match Requests
// --------------------------
//
// Handle any requests to the /api/match path and invoke the appropriate match controller methods

var matchController = require('./matchController.js');

module.exports = function(app) {
  
  // Get all of the matchs in the system
  app.route('/')
    .get(matchController.getAllMatches);

  // Add a new match to the system
  app.route('/add')
    .post(matchController.addMatch);

};
