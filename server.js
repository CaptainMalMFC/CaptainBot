var express = require('express');
var logger = require('morgan');

app = express();
app.use(logger('dev'));

var DEFAULT_PORT = 6969;

app.get('/', function(req, res, next) {
  res.send("Hello There! :)");
});

var port = process.env.PORT || DEFAULT_PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});