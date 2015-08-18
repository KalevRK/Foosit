// Controller for Match Data
// -------------------------
//
// Based on requests sent to the Match route create or read Match data from
// the MongoDB database.

// ELO library for calculating player ratings
var ELO = require('../../lib/elo.js');

// Mongoose Models
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
    
    // store the retrieved or created Player documents from the MongoDB database
    // in order to update based on the results of the match
    var winningPlayer, losingPlayer;
    var winnerELO, loserELO;
    var winnerWincount, loserWincount;
    
    // If any of the two players involved in the match don't exist in the database
    // then create them
    Player.findOneAsync({ 'name': req.body.winner })
      .then(function(player) {
        // if player is null then create them
        if (player === null) {
          
          var newPlayer = {
            name: req.body.winner,
            eloRating: 1600,
            winRecord: 0,
            lossRecord: 0
          };

          return Player.createAsync(newPlayer);
        } else {
          winningPlayer = player;
        }
      })
      .then(function(player) {
        if (!winningPlayer) {
          winningPlayer = player;
        }

        // Check to see if losing player exists
        return Player.findOneAsync({ 'name': req.body.loser });
      })
      .then(function(player) {
        // if player is null then create them
        if (player === null) {

          var newPlayer = {
            name: req.body.loser,
            eloRating: 1600,
            winRecord: 0,
            lossRecord: 0
          };

          return Player.createAsync(newPlayer);
        } else {
          losingPlayer = player;
        }
      })
      .then(function(player) {
        if (!losingPlayer) {
          losingPlayer = player;
        }

        // Calculate new ELO ratings for players
        winnerELO = ELO.getNewRating(winningPlayer.eloRating, losingPlayer.eloRating, 1);
        loserELO = ELO.getNewRating(losingPlayer.eloRating, winningPlayer.eloRating, 0);

        // Update ELO Rating, # Wins, and # Losses for players
        // Update winning player
        return Player.updateAsync({ 'name': winningPlayer.name }, { $inc: { winRecord: 1 }, eloRating: winnerELO });
      })
      .then(function(updatedWinner) {
        // Update losing player
        return Player.updateAsync({ 'name': losingPlayer.name }, { $inc: { lossRecord: 1 }, eloRating: loserELO });
      })
      .then(function(updatedLoser) {
        // Check if wincount exists for winner vs. loser
        return Wincount.findOneAsync({ 'player': winningPlayer.name, 'opponent': losingPlayer.name });
      })
      .then(function(wWincount) {
        // if winnerWincount is null then create new one
        if (wWincount === null) {

          var newWinnerWincount = {
            player: winningPlayer.name,
            opponent: losingPlayer.name,
            wincount: 0
          };

          return Wincount.createAsync(newWinnerWincount);
        } else {
          winnerWincount = wWincount;
        }
      })
      .then(function(newWinnerWincount) {
        if (!winnerWincount) {
          winnerWincount = newWinnerWincount;
        }

        // Update the wincount for the winning player
        return Wincount.updateAsync({ 'player': winningPlayer.name, 'opponent': losingPlayer.name }, { $inc: { wincount: 1 } });
      })
      .then(function(updatedWinCount) {
        // Create and save new match
        var newMatch = {
          date: req.body.date,
          winner: req.body.winner,
          winnerScore: req.body.winnerScore,
          loser: req.body.loser,
          loserScore: req.body.loserScore
        };

        return Match.createAsync(newMatch);
      })
      .then(function(newlyCreatedMatch) {
        res.json(newlyCreatedMatch);
      })
      .catch(function(err) {
        console.error('Error in adding new match:', err);
      });
  }

};
