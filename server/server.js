// Server
// ------
//
// Create an Express server and have it start listening for requests

var express = require('express');

var app = express();

require('./middleware.js')(app, express);

app.listen(8000);

console.log('Server is listening on port 8000');
