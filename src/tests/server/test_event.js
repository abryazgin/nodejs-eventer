var assert = require('assert');
var request = require('supertest');

var DB = require('../../base/db/api');
var Random = require('./../utils/random');

module.exports = function(config) {
    describe('Creating and deleting', function () {
        it('After creating must exists in DB + after deleting must not exists', function test(done) {
            var event = get_random_event();

            return create_event(
                event,
                1,
                delete_event(
                    event,
                    done
                )
            )();
        });

        it('Duplicate creating is possibly + after deleting must not exists', function test(done) {
            var event = get_random_event();

            return create_event(
                event,
                1,
                create_event(
                    event,
                    2,
                    create_event(
                        event,
                        3,
                        delete_event(
                            event,
                            done
                        )
                    )
                )
            )();
        });
    });

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
                if (event) {
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
                    check_event_count(null, 0, callback)
                })
        }
    }
};