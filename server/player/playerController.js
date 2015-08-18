// Controller for Player Data
// --------------------------
//
// Based on requests sent to the Player route create, read, or update player data from
// the MongoDB database.

var Player = require('./playerModel.js');

module.exports = {

  // Retrieve all of the players in the database
  getAllPlayers: function(req, res) {
    Player.findAsync()
      .then(function(players) {
        res.json(players);
      })
      .catch(function(err){
        console.error('Error in reading players');
      });
  }

};
