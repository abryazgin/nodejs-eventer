
module.exports = function(config) {
    var CookSubscribe = require('./../utils/cook/cook_subscribe')(config);

    describe('Creating and deleting', function () {
        it('After creating must exists in DB', function test(done) {
            var sub = CookSubscribe.get_random_sub();

            return CookSubscribe.create_sub(
                sub,
                CookSubscribe.delete_sub(
                    sub,
                    done
                )
            )();
        });

        it('Duplicate creating is possibly', function test(done) {
            var sub = CookSubscribe.get_random_sub();

            return CookSubscribe.create_sub(
                sub,
                CookSubscribe.create_sub(
                    sub,
                    CookSubscribe.create_sub(
                        sub,
                        CookSubscribe.delete_sub(
                            sub,
                            done
                        )
                    )
                )
            )();
        });
    });
};