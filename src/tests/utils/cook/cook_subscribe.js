var assert = require('assert');
var request = require('supertest');

var Random = require('./../../utils/random');
var DB = require('../../../base/db/api');


module.exports = function(config) {
    return {
        get_random_sub: function () {
            return {
                event: Random.randomstr(20),
                callback: Random.randomstr(20)
            }
        },

        check_sub_count: function (sub, count, callback) {
            DB.subscriber.list(
                sub,
                function (subscribers) {
                    assert.equal(subscribers.length, count);
                    if (sub) {
                        assert.equal(subscribers[0].event, sub.event);
                        assert.equal(subscribers[0].callback, sub.callback);
                    }
                    callback();
                })
        },

        create_sub: function (sub, callback) {
            return function () {
                request(config.server)
                    .post('/api/subscribe')
                    .send(sub)
                    .expect(200)
                    .end(function () {
                        check_sub_count(sub, 1, callback)
                    })
            }
        },

        delete_sub: function (sub, callback) {
            return function () {
                request(config.server)
                    .delete('/api/subscribe')
                    .send(sub)
                    .expect(200)
                    .end(function () {
                        check_sub_count(null, 0, callback)
                    })
            }
        }
    }
};