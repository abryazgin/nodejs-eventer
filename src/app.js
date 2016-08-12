var express = require('express');

var log = require('./base/logger')(module);
var handlers = require('./base/handler');
var routes = require('./routes');

var app = express();

var port = 8000;

routes(app);

app.use(handlers.handler404);
app.use(handlers.handler500);

app.listen(port, function(){
    log.info('Server started on port',port);
});
