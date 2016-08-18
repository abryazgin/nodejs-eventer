var assert = require('assert');
var request = require('supertest');

var testEvent = require('./server/test_event');
var testSub = require('./server/test_event');
var testHTTPtypes = require('./server/test_event');

describe('API', function() {
    var config = {};

    before(function () {
        config.server = require('../app');
    });

    after(function () {
        config.server.close();
    });

    describe('Event', testEvent(config));
    describe('Subsribe', testSub(config));
    describe('Different HTTPtype request', testHTTPtypes(config));

});
