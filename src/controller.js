var Config = require('./config');
var DB = require('./base/db');
var Handler = require('./base/handler');
var Logger = require('./base/logger')(module);

function addEvent(req, res){
    Logger.info('addEvent!');
    // mongo.Db.connect(mongoUri, function (err, db) {
    //     db.collection('events', function(er, collection) {
    //         collection.find().toArray(function(err, items) {
    //             res.send(items);
    //             db.close();
    //         });
    //     });
    // });
    res.send({'rescode': 1});
}

function addSubscriber(req, res){
    Logger.info('addSubscriber!');
    // check parameters
    if (!req.body || !req.body.event || !req.body.callback){
        Handler.error('Incorrect parameters! Body must have `event` and `callback`');
    }
    // add to db
    DB.addSubscriber(
        {
            event: req.body.event,
            callback: req.body.callback
        },
        function (result){
            res.send(result);
        });
}
function deleteSubscriber(req, res){
    Logger.info('deleteSubscriber!');
    // check parameters
    if (!req.body || !req.body.event || !req.body.callback){
        Handler.error('Incorrect parameters! Body must have `event` and `callback`');
    }
    // delete to db
    DB.deleteSubscriber(
        {
            event: req.body.event,
            callback: req.body.callback
        },
        function (result){
            res.send(result);
        });
}


module.exports = {
    addEvent: addEvent,
    deleteSubscriber: deleteSubscriber,
    addSubscriber: addSubscriber
};