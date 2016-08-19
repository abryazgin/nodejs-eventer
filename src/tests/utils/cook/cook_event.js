var assert = require('assert');
var request = require('supertest');

var Random = require('./../../utils/random');
var DB = require('../../../base/db/api');

module.exports = function (config) {

    function get_random_event() {
        return {
            event: Random.randomstr(20),
            data: {
                test: true,
                list: [
                    Random.randomstr(20), Random.randomstr(10)
                ]
            }
        };
    }

    function check_event_count(event, count, callback) {
        DB.event.list(
            event,
            function (subscribers) {
                assert.equal(subscribers.length, count);
                if (count) {
                    assert.equal(subscribers[0].event, event.event);
                    assert.equal(JSON.stringify(subscribers[0].data), JSON.stringify(event.data));
                }
                callback();
            })
    }

    function create_event(event, expected_count, callback) {
        return function () {
            request(config.server)
                .post('/api/event')
                .send(event)
                .expect(200)
                .end(function () {
                    check_event_count(event, expected_count, callback)
                })
        }
    }

    function delete_event(event, callback) {
        return function () {
            request(config.server)
                .delete('/api/event')
                .send(event)
                .expect(200)
                .end(function () {
                    check_event_count(event, 0, callback)
                })
        }
    }

    return {
        get_random_event: get_random_event,
        check_event_count: check_event_count,
        create_event: create_event,
        delete_event: delete_event
    }
};