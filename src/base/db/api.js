var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var config = require('../../config');
var Logger = require('./../logger')(module);
var EventModel = require('./event');
var SubscribeModel = require('./subscribe');
var Notificator = require('./../notificator');


//////////////////////////////////////
// Event
//////////////////////////////////////
function addEvent(eventdict, callback){

    Logger.debug('addEvent', eventdict);
    MongoClient.connect(config.mongourl, function(err, db) {
        assert.equal(null, err);
        SubscribeModel.list(db, {event: eventdict.event}, function(subscribers) {
            eventdict.subscribers = subscribers;
            EventModel.add(db, eventdict, function (result) {
                callback(result);
                delete eventdict.subscribers;
                Logger.debug('Notify start');
                subscribers.forEach(function(item, i, arr){
                    Notificator.alert(eventdict,item.callback);
                });
                EventModel.setsended(db, eventdict, function(){
                    db.close();
                });
            })
        });
    });
}

function getEvents(eventdict, callback){

    Logger.debug('getEvents', eventdict);

    MongoClient.connect(config.mongourl, function(err, db) {
        assert.equal(null, err);
        EventModel.list(db, eventdict, function(result) {
            db.close();
            callback(result);
        });
    });
}

function removeEvent(eventdict, callback){

    Logger.debug('removeEvent', eventdict);

    MongoClient.connect(config.mongourl, function(err, db) {
        assert.equal(null, err);
        EventModel.remove(db, eventdict, function(result) {
            db.close();
            callback(result);
        });
    });
}

//////////////////////////////////////
// Subscriber
//////////////////////////////////////

function addSubscribe(subscribedict, callback){

    Logger.debug('addSubscriber', subscribedict);

    MongoClient.connect(config.mongourl, function(err, db) {
        assert.equal(null, err);
        SubscribeModel.list(db, subscribedict, function(subscribers) {
            if (subscribers.length == 0) {
                SubscribeModel.add(db, subscribedict, function (result) {
                    db.close();
                    callback(result);
                });
            } else {
                db.close();
                callback(subscribers[0]);
            }
        });
    });
}

function getSubscribers(subscribedict, callback){

    Logger.debug('getSubscribers', subscribedict);

    MongoClient.connect(config.mongourl, function(err, db) {
        assert.equal(null, err);
        SubscribeModel.list(db, subscribedict, function(result) {
            db.close();
            callback(result);
        });
    });
}

function removeSubscribe(subscribedict, callback){

    Logger.debug('removeSubscribe', subscribedict);

    MongoClient.connect(config.mongourl, function(err, db) {
        assert.equal(null, err);
        SubscribeModel.remove(db, subscribedict, function(result) {
            db.close();
            callback(result);
        });
    });
}

module.exports = {
    event: {
        add: addEvent,
        remove: removeEvent,
        list: getEvents
    },
    subscriber: {
        add: addSubscribe,
        remove: removeSubscribe,
        list: getSubscribers
    }
};