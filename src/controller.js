var DB = require('./base/db/api');
var Handler = require('./base/handler');
var Logger = require('./base/logger')(module);

function addEvent(req, res){
    Logger.info('addEvent!');
    // check parameters
    if (!req.body || !req.body.event || !req.body.data){
        Handler.error(res, 'Incorrect parameters! Body must have `event` and `data`');
    }
    // add to db
    DB.event.add(
        {
            event: req.body.event,
            data: req.body.data,
            sended: false
        },
        function (result){
            // response
            res.send(result);
        });
}

function addSubscribe(req, res){
    Logger.info('addSubscribe!');
    // check parameters
    if (!req.body || !req.body.event || !req.body.callback){
        Handler.error(res, 'Incorrect parameters! Body must have `event` and `callback`');
    }
    // add to db
    DB.subscriber.add(
        {
            event: req.body.event,
            callback: req.body.callback
        },
        function (result){
            // response
            res.send(result);
        });
}
function deleteSubscribe(req, res){
    Logger.info('deleteSubscribe!');
    // check parameters
    if (!req.body || !req.body.event || !req.body.callback){
        Handler.error(res, 'Incorrect parameters! Body must have `event` and `callback`');
    }
    // delete to db
    DB.subscriber.remove(
        {
            event: req.body.event,
            callback: req.body.callback
        },
        function (result){
            // response
            res.send(result);
        });
}
function deleteEvent(req, res){
    Logger.info('deleteEvent!');
    // check parameters
    if (!req.body || !req.body.event || !req.body.data){
        Handler.error(res, 'Incorrect parameters! Body must have `event` and `data`');
    }
    // delete to db
    DB.event.remove(
        {
            event: req.body.event,
            data: req.body.data
        },
        function (result){
            // response
            res.send(result);
        });
}


module.exports = {
    addEvent: addEvent,
    deleteEvent: deleteEvent,
    addSubscribe: addSubscribe,
    deleteSubscribe: deleteSubscribe
};