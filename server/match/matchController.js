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
  getAllMatchs: function(req, res) {

  },

  // Add a match to the database
  // If any of the two players involved in the match don't exist in the database
  // then create them
  // Update the players' win/loss records and their ELO ratings
  // If there is no wincount record for the winner against this opponent then create it
  // otherwise update the existing wincount record
  addMatch: function(req, res) {

  }

};
