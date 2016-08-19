var assert = require('assert');

var Logger = require('../logger')(module);

function add(db, event, callback) {
    Logger.debug('Creating event', event.event);
    db.collection('event').insertOne(event, function(err, result) {
        assert.equal(err, null);
        Logger.debug('Event successfully created');
        callback(result);
    });
}

function setsended(db, event, callback) {
    Logger.debug('Set event done', event.event);
    db.collection('event').update(event, { $set: { sended : true  } } , function(err, result) {
        assert.equal(err, null);
        Logger.debug('Event successfully setting to done');
        callback(result);
    });
}

function remove(db, eventdict, callback) {
    Logger.debug('Deleting event', eventdict.event);
    db.collection('event').remove(eventdict, function(err, result) {
        assert.equal(err, null);
        Logger.debug('Event successfully deleted');
        callback(result);
    });
}

function list(db, eventdict, callback) {
    Logger.debug('Listing events', eventdict.event);
    db.collection('event').find(eventdict, function(err, cursor) {
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
    setsended: setsended,
    remove: remove,
    list: list
};