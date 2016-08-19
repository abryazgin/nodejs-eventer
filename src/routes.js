var Controller = require('./controller');
var Logger = require('./base/logger')(module);

function register(app) {
    // Events
    app.post('/api/event', Controller.addEvent);
    app.delete('/api/event', Controller.deleteEvent);

    // Subscribe
    app.post('/api/subscribe', Controller.addSubscribe);
    app.delete('/api/subscribe', Controller.deleteSubscribe);

    // Callback
    app.post('/test/callback/:id', function(req, res){
        var response = req.body;
        var msg = req.params.id;
        Logger.info('/test/callback', msg, response);
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