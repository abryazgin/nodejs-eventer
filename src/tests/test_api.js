var assert = require('assert');
var request = require('supertest');

var testEvent = require('./server/test_event');
var testSub = require('./server/test_subscribe');
var testHTTPtypes = require('./server/test_http_req_types');

describe('API', function() {
    var config = {};

    before(function () {
        config.server = require('../app');
    });

    after(function () {
        config.server.close();
    });

    describe('Event', function(){testEvent(config)});
    describe('Subsribe', function(){testSub(config)});
    describe('Different HTTPtype request', function(){testHTTPtypes(config)});

});
