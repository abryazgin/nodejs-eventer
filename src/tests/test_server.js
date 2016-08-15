var assert = require('assert');
var request = require('supertest');

var DB = require('../base/db');

describe('Test server', function() {
    var server;

    before(function () {
        server = require('../app');
    });

    after(function () {
        server.close();
    });

    describe('Subscribers', function() {
        describe('Subscribe', function () {
            it('must responds to /api/subscribes + must exists in db', function testSlash(done) {
                var body = {
                    event: 'someEvent',
                    callback: 'localhost:8000/test/callback'
                };

                return request(server)
                    .delete('/api/subscribes')
                    .send(body)
                    .expect(200)
                    .end(function(){
                        return DB.getSubscribers(
                            body, function(subscribers) {
                                console.log('RESULT', subscribers)
                                assert.equal(subscribers, {});
                                return request(server)
                                    .post('/api/subscribes')
                                    .send(body)
                                    .expect(200)
                                    .end(function () {
                                        return DB.getSubscribers(
                                            body, function (subscribers) {
                                                return assert(subscribers.length > 0);
                                            })
                                    });
                            });
                    });
            });
        });
    });

    describe('Events', function() {
        describe('Signal', function () {
            it('must responds to /api/events', function testSlash(done) {
                request(server)
                    .post('/api/events')
                    .expect(200, done);
            });

        });
    });


    describe('Simple tests', function() {
        describe('GET', function () {

            it('must responds to /test/simple/get', function test(done) {
                request(server)
                    .get('/test/simple/get')
                    .expect(200, done);
            });
            it('must NOT responds to /not/existed/path', function test(done) {
                request(server)
                    .get('/not/existed/path')
                    .expect(404, done);
            });
            it('must FAILED on /test/ErrorExample', function test(done) {
                request(server)
                    .get('/test/ErrorExample')
                    .expect(500, done);
            });
            it('must NOT responds to /test/simple/put', function test(done) {
                request(server)
                    .get('/test/simple/put')
                    .expect(404, done);
            });

        });

        describe('PUT', function () {

            it('must NOT responds to /test/simple/get', function test(done) {
                request(server)
                    .put('/test/simple/get')
                    .expect(404, done);
            });
            it('must NOT responds to /not/existed/path', function test(done) {
                request(server)
                    .put('/not/existed/path')
                    .expect(404, done);
            });
            it('must NOT responds to /test/ErrorExample', function test(done) {
                request(server)
                    .put('/test/ErrorExample')
                    .expect(404, done);
            });
            it('must responds to /test/simple/put', function test(done) {
                request(server)
                    .put('/test/simple/put')
                    .expect(200, done);
            });

        });

        describe('POST', function () {

            it('must NOT responds to /test/simple/get', function test(done) {
                request(server)
                    .post('/test/simple/get')
                    .expect(404, done);
            });
            it('must NOT responds to /not/existed/path', function test(done) {
                request(server)
                    .post('/not/existed/path')
                    .expect(404, done);
            });
            it('must NOT responds to /test/ErrorExample', function test(done) {
                request(server)
                    .post('/test/ErrorExample')
                    .expect(404, done);
            });
            it('must NOT responds to /test/simple/put', function test(done) {
                request(server)
                    .post('/test/simple/put')
                    .expect(404, done);
            });
            it('must responds to /test/callback', function test(done) {
                request(server)
                    .post('/test/callback')
                    .send({ message: 'Hello, Callback!'})
                    .expect(200, done);
            });
            it('must responds to /test/callback by body of request', function test(done) {
                var body = {message: 'Hello, Callback!'};

                request(server)
                    .post('/test/callback')
                    .send(body)
                    .expect(200, body)
                    .end(done);
            });

        });
    });

});
