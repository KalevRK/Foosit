// Controller for Wincount Data
// ----------------------------
//
// Based on requests sent to the Wincount route create, read, or update Wincount data from
// the MongoDB database.

var Wincount = require('./wincountModel.js');

module.exports = {

  // Retrieve all of the wincounts in the database
  getAllWincounts: function(req, res) {
    Wincount.findAsync()
      .then(function(wincounts) {
        res.json(wincounts);
      })
      .catch(function(err){
        console.error('Error in reading wincounts');
      });
  }

};