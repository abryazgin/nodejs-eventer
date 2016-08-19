var assert = require('assert');

module.exports = function (config) {
    var CookEvent = require('./../utils/cook/cook_event')(config);
    var CookSubscribe = require('./../utils/cook/cook_subscribe')(config);

    describe('Creating and deleting', function () {

        it('Event with subscribers', function test(done) {
            var event = CookEvent.get_random_event();
            var subscriber1 = CookSubscribe.get_default_sub(event.event, 'I_am_first');
            var subscriber2 = CookSubscribe.get_default_sub(event.event, 'You_are_second');

            return CookSubscribe.create_sub(
                subscriber1,
                CookSubscribe.create_sub(
                    subscriber2,
                    CookEvent.create_event(
                        event,
                        1,
                        done
                    )
                )
            )();
        });

        it('After creating must exists in DB + after deleting must not exists', function test(done) {
            var event = CookEvent.get_random_event();

            return CookEvent.create_event(
                event,
                1,
                CookEvent.delete_event(
                    event,
                    done
                )
            )();
        });

        it('Duplicate creating is possibly + after deleting must not exists', function test(done) {
            var event = CookEvent.get_random_event();

            return CookEvent.create_event(
                event,
                1,
                CookEvent.create_event(
                    event,
                    2,
                    CookEvent.create_event(
                        event,
                        3,
                        CookEvent.delete_event(
                            event,
                            done
                        )
                    )
                )
            )();
        });
    });
};