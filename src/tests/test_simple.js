var assert = require('assert');
var db = require('./../base/db');

describe('Testing tests', function() {

    describe('simple', function() {

        it('should be successfully', function truthy_test() {
            assert.equal(true, 1 == 1);
        });

    });

    // describe('mongodb', function (){
    //     db.addSubscriber(
    //         {
    //             event: 'SomeEvent',
    //             callback: 'localhost:8000/test/callback'
    //         },
    //         function(result){
    //             console.log('Result', result);
    //         });
    //
    // })

});
