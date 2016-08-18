

module.exports = function(config) {
    var CookSubsribe = require('./../utils/cook/cook_subscribe')(config);

    describe('Creating and deleting', function () {
        it('After creating must exists in DB', function test(done) {
            var sub = CookSubsribe.get_random_sub();

            return CookSubsribe.create_sub(
                sub,
                CookSubsribe.delete_sub(
                    sub,
                    done
                )
            )();
        });

        it('Duplicate creating is possibly', function test(done) {
            var sub = CookSubsribe.get_random_sub();

            return CookSubsribe.create_sub(
                sub,
                CookSubsribe.create_sub(
                    sub,
                    CookSubsribe.create_sub(
                        sub,
                        CookSubsribe.delete_sub(
                            sub,
                            done
                        )
                    )
                )
            )();
        });
    });
};