// Match Model
// -----------
//
// The Match model represents the structure of the Match documents in the MongoDB database.

var mongoose = require('mongoose');

module.exports = mongoose.model('Match', new mongoose.Schema({
  date: { type: Date, default: Date.now },
  winner: String,
  winnerScore: Number,
  loser: String,
  loserScore: Number
}));