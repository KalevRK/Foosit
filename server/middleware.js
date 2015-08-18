// Express Server Middleware
// -------------------------
//
// Configure the passed in Express server with middleware and routers

var morgan = require('morgan'); // for logging requests
var bodyParser = require('body-parser'); // for parsing HTTP POST request bodies


module.exports = function(app, express) {

  // Serve up static files
  app.use(express.static(__dirname + '/../app'));

  // Log requests
  app.use(morgan('dev'));

  // Parse POST request bodies
  app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // Parse application/json

  // Create Express routers for each type of data document
  var playerRouter = express.Router();
  var matchRouter = express.Router();
  var wincountRouter = express.Router();

  // Connect routers with request paths
  app.use('/api/player', playerRouter);
  app.use('/api/match', matchRouter);
  app.use('/api/wincount', wincountRouter);

  // Load route files for each type of data document and pass in Express routers
  require('./player/playerRoutes.js')(playerRouter);
  require('./match/matchRoutes.js')(matchRouter);
  require('./wincount/wincountRoutes.js')(wincountRouter);

};
