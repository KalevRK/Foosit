// Player Model
// ------------
//
// The Player model represents the structure of the Player documents in the MongoDB database.

var mongoose = require('mongoose');

module.exports = mongoose.model('Player', new mongoose.Schema({
  name: String,
  eloRating: { type: Number, default: 1600 },
  winRecord: { type: Number, default: 0 },
  lossRecord: { type: Number, default: 0 }
}));