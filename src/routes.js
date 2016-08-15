var Controller = require('./controller');
var Logger = require('./base/logger')(module);

function register(app) {
    // Events
    app.post('/api/events', Controller.addEvent);

    // Subscribe
    app.post('/api/subscribes', Controller.addSubscriber);
    app.delete('/api/subscribes', Controller.deleteSubscriber);

    // Callback
    app.post('/test/callback', function(req, res){
        var response = req.body;
        Logger.info('/test/callback', response);
        res.send(response);
    });

    // test
    app.put('/test/simple/put', function (req, res) {
        res.send('This is not implemented now');
    });

    app.get('/test/simple/get', function (req, res) {
        res.send('This is not implemented now');
    });

    app.get('/test/ErrorExample', function (req, res, next) {
        next(new Error('Random error!'));
    });
}

module.exports = register;