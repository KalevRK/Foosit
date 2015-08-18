// Routing for Player Requests
// ---------------------------
//
// Handle any requests to the /api/player path and invoke the appropriate player controller methods

var playerController = require('./playerController.js');

module.exports = function(app) {
  
  // Get all of the players in the system
  app.route('/')
    .get(playerController.getAllPlayers);

};
