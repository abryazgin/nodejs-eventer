var express = require('express');
var bodyParser = require('body-parser')

var Config = require('./config');
var Logger = require('./base/logger')(module);
var Handlers = require('./base/handler');
var Routes = require('./routes');

var app = express();

var port = Config.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));

Routes(app);

app.use(Handlers.handler404);
app.use(Handlers.handler500);

var server = app.listen(port, function(){
    Logger.info('Server started on port',port);
});

module.exports = server;
