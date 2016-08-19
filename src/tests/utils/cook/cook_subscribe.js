var assert = require('assert');
var request = require('supertest');

var Random = require('./../../utils/random');
var DB = require('../../../base/db/api');

module.exports = function (config) {
    var default_callback = 'http://localhost:8000/test/callback';
    function get_random_sub() {
        return get_sub (Random.randomstr(20), Random.randomstr(20))
    }

    function get_default_sub(event, msg) {
        return get_sub (event, default_callback + '/' + msg)
    }

    function get_sub(event, callback) {
        callback = callback || default_callback;
        return {
            event: event,
            callback: callback
        }
    }

    function check_sub_count(sub, count, callback) {
        DB.subscriber.list(
            sub,
            function (subscribers) {
                assert.equal(subscribers.length, count);
                if (count) {
                    assert.equal(subscribers[0].event, sub.event);
                    assert.equal(subscribers[0].callback, sub.callback);
                }
                callback();
            })
    }

    function create_sub(sub, callback) {
        return function () {
            request(config.server)
                .post('/api/subscribe')
                .send(sub)
                .expect(200)
                .end(function () {
                    check_sub_count(sub, 1, callback)
                })
        }
    }

    function delete_sub(sub, callback) {
        return function () {
            request(config.server)
                .delete('/api/subscribe')
                .send(sub)
                .expect(200)
                .end(function () {
                    check_sub_count(sub, 0, callback)
                })
        }
    }

    return {
        get_random_sub: get_random_sub,
        get_default_sub: get_default_sub,
        get_sub: get_sub,
        check_sub_count: check_sub_count,
        create_sub: create_sub,
        delete_sub: delete_sub
    }
};