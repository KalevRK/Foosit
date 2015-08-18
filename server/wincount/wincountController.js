// Controller for Wincount Data
// ----------------------------
//
// Based on requests sent to the Wincount route create, read, or update Wincount data from
// the MongoDB database.

var Wincount = require('./wincountModel.js');
var Player = require('../player/playerModel.js');

module.exports = {

  // Retrieve all of the wincounts in the database
  getAllWincounts: function(req, res) {
    Wincount.findAsync()
      .then(function(wincounts) {
        // Given array of wincounts for all players
        // convert into nodes and links JSON object needed by D3.js graph
        convertToGraphData(res, wincounts);
      })
      .catch(function(err){
        console.error('Error in reading wincounts');
      });
  }
};

// Given a JSON object of wincounts for all players
// convert into nodes and links JSON object
function convertToGraphData(res, wincounts) {
  
  // Arrays to store nodes and links needed for D3.js graph
  var nodes = [];
  var links = [];

  var sourceIndex, targetIndex;

  // Get distinct set of players
  Player.findAsync()
  .then(function(players) {
    players.forEach(function(player) {
      nodes.push({ 'name': player.name});
    });
  })
  .then(function() {
    // Based on wincounts array create links array with source and target indices and wincount value
    wincounts.forEach(function(record) {
      console.log(record);
      sourceIndex = getIndexByProperty(nodes, 'name', record.player);
      targetIndex = getIndexByProperty(nodes, 'name', record.opponent);
      links.push({
        'source': sourceIndex,
        'target': targetIndex,
        'value': record.wincount
      });
    });

    // Create JSON object of nodes and links to return
    var result = {
      'nodes': nodes,
      'links': links
    };

    res.json(result);
  })
  .catch(function(err) {
    console.error('Error in finding all players:', err);
  });
}

function getIndexByProperty(arr, prop, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
}