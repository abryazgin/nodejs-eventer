var assert = require('assert');

var Logger = require('../logger')(module);

function add(db, event, callback) {
    Logger.debug('Creating event', event);
    db.collection('event').insertOne(event, function(err, result) {
        assert.equal(err, null);
        Logger.debug('Event successfully created', event._id);
        callback(result);
    });
}

function remove(db, subscribedict, callback) {
    Logger.debug('Deleting event', subscribedict);
    db.collection('event').remove(subscribedict, function(err, result) {
        assert.equal(err, null);
        Logger.debug('Event successfully deleted', subscribedict._id);
        callback(result);
    });
}

function list(db, subscribedict, callback) {
    Logger.debug('Listing events', subscribedict);
    db.collection('event').find(subscribedict, function(err, cursor) {
        assert.equal(err, null);
        Logger.debug('Events successfully received');
        var result = [];
        cursor.each(function(err, sub){
            if (sub != null) {
                Logger.debug('event', JSON.stringify(sub));
                result.push(sub);
            } else {
                callback(result);
            }
        });
    });
}

module.exports = {
    add: add,
    remove: remove,
    list: list
};