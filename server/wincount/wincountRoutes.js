// Routing for Wincount Requests
// -----------------------------
//
// Handle any requests to the /api/wincount path and invoke the appropriate wincount controller methods

var wincountController = require('./wincountController.js');

module.exports = function(app) {
  
  // Get all of the wincounts in the system
  app.route('/')
    .get(wincountController.getAllWincounts);

};