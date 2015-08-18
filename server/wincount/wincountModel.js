// Wincount Model
// --------------
//
// The Wincount model represents the structure of the Wincount documents in the MongoDB database.

var mongoose = require('mongoose');

module.exports = mongoose.model('Wincount', new mongoose.Schema({
  player: String,
  opponent: String,
  wincount: Number
}));
