var assert = require('assert');

var Logger = require('../logger')(module);


function add(db, subscribedict, callback) {
    Logger.debug('Creating subscribe', subscribedict);
    db.collection('subscribe').insertOne(subscribedict, function(err, result) {
        assert.equal(err, null);
        Logger.debug('Subscribe successfully created', subscribedict._id);
        callback(result);
    });
}

function remove(db, subscribedict, callback) {
    Logger.debug('Deleting subscribe', subscribedict);
    db.collection('subscribe').remove(subscribedict, function(err, result) {
        assert.equal(err, null);
        Logger.debug('Subscribe successfully deleted', subscribedict._id);
        callback(result);
    });
}

function list(db, subscribedict, callback) {
    Logger.debug('Listing subscribers', subscribedict);
    db.collection('subscribe').find(subscribedict, function(err, cursor) {
        assert.equal(err, null);
        Logger.debug('Subscribers successfully received');
        var result = [];
        cursor.each(function(err, sub){
            if (sub != null) {
                Logger.debug('sub', JSON.stringify(sub));
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