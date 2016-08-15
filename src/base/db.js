var MongoClient = require('mongodb').MongoClient;

var config = require('../config');
var Logger = require('./logger')(module);


//////////////////////////////////////
// Event
//////////////////////////////////////
function addEvent(eventdict, callback){

    Logger.debug('addEvent',eventdict);

    return MongoClient.connect(config.mongourl, function (err, db) {
        return getSubscribersBody(db, eventdict, function(result){
            if (result && result.length > 0){
                eventdict.subscribers = result;
                return addEventBody(db, eventdict, function(result){
                    if (result && result.length > 0) {
                        return callback(result[0])
                    }
                })
            } else {
                Logger.warning('Does not exist subscribers on event', eventdict);
                return callback(result[0])
            }
        })
    });
}

function addEventBody(db, eventdict, callback){

    return db.collection('events', function(er, collection) {
        return collection.insert({
            event: eventdict.event,
            subscribers: eventdict.subscribers,
            data: eventdict.data
        }, {safe:true}, function(err, result) {
            if (callback)
                return callback(result);
            db.close();
        });
    });
}
//////////////////////////////////////
// Subscriber
//////////////////////////////////////

function addSubscriber(eventdict, callback){

    Logger.debug('addSubscriber',eventdict);

    return MongoClient.connect(config.mongourl, function (err, db) {
        return getSubscribersBody(db, eventdict, function(result){
            if (result && result.length > 0){
                return callback(result[0])
            } else {
                return addSubscriberBody(db, eventdict, function(result){
                    if (result && result.length > 0) {
                        return callback(JSON.stringify(result[0]))
                    }
                })
            }
        })
    });
}
function getSubscribers(eventdict, callback){

    Logger.debug('getSubscriber',eventdict);

    return MongoClient.connect(config.mongourl, function (err, db) {
        return getSubscribersBody(db, eventdict, function(result){
            callback(JSON.stringify(result));
            db.close();
        })
    });
}

function deleteSubscriber(eventdict, callback){

    Logger.debug('deleteSubscriber',eventdict);

    return MongoClient.connect(config.mongourl, function (err, db) {
        return db.collection('subscribers', function(er, collection) {
            return collection.remove({
                    event: eventdict.event,
                    callback: eventdict.callback
                }, {safe:true}, function(err, result) {
                    if (callback)
                        callback(JSON.stringify(result));
                    db.close();
                });
        });
    });
}

function addSubscriberBody(db, eventdict, callback){

    return db.collection('subscribers', function(er, collection) {
        return collection.insert({
                event: eventdict.event,
                callback: eventdict.callback
            }, {safe:true}, function(err, result) {
                if (callback)
                    return callback(result);
            });
    });
}

function getSubscribersBody(db, eventdict, callback){

    return db.collection('subscribers', function(er, collection) {
        // ищем подписку
        return collection.find({
                event: eventdict.event,
                callback: eventdict.callback
            }, {safe:true}, function(err, result) {
                if (callback)
                    return callback(result);
            });
    });
}

module.exports = {
    addSubscriber: addSubscriber,
    deleteSubscriber: deleteSubscriber,
    getSubscribers: getSubscribers
};