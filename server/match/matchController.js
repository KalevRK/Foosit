// Controller for Match Data
// -------------------------
//
// Based on requests sent to the Match route create or read Match data from
// the MongoDB database.

var Match = require('./matchModel.js');
var Player = require('../player/playerModel.js');
var Wincount = require('../wincount/wincountModel.js');

module.exports = {

  // Retrieve all of the matches in the database
  getAllMatches: function(req, res) {
    Match.findAsync()
      .then(function(matches) {
        res.json(matches);
      })
      .catch(function(err){
        console.error('Error in reading matches');
      });
  },

  // Add a match to the database
  addMatch: function(req, res) {
    
    // req.body contains:
      // date
      // winner
      // winnerScore
      // loser
      // loserScore

    console.log('req.body.date:', req.body.date);
    console.log('req.body.winner:', req.body.winner);
    console.log('req.body.winnerScore:', req.body.winnerScore);
    console.log('req.body.loser:', req.body.loser);
    console.log('req.body.loserScore:', req.body.loserScore);
    
    // If any of the two players involved in the match don't exist in the database
    // then create them

    // Update the players' win/loss records and their ELO ratings
    // If there is no wincount record for the winner against this opponent then create it
    // otherwise update the existing wincount record

    res.json({});
  }

};
