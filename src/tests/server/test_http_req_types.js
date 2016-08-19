var assert = require('assert');
var request = require('supertest');

module.exports = function(config) {
    describe('GET', function () {

        it('must responds to /test/simple/get', function test(done) {
            request(config.server)
                .get('/test/simple/get')
                .expect(200, done);
        });
        it('must NOT responds to /not/existed/path', function test(done) {
            request(config.server)
                .get('/not/existed/path')
                .expect(404, done);
        });
        it('must FAILED on /test/ErrorExample', function test(done) {
            request(config.server)
                .get('/test/ErrorExample')
                .expect(500, done);
        });
        it('must NOT responds to /test/simple/put', function test(done) {
            request(config.server)
                .get('/test/simple/put')
                .expect(404, done);
        });

    });

    describe('PUT', function () {

        it('must NOT responds to /test/simple/get', function test(done) {
            request(config.server)
                .put('/test/simple/get')
                .expect(404, done);
        });
        it('must NOT responds to /not/existed/path', function test(done) {
            request(config.server)
                .put('/not/existed/path')
                .expect(404, done);
        });
        it('must NOT responds to /test/ErrorExample', function test(done) {
            request(config.server)
                .put('/test/ErrorExample')
                .expect(404, done);
        });
        it('must responds to /test/simple/put', function test(done) {
            request(config.server)
                .put('/test/simple/put')
                .expect(200, done);
        });

    });

    describe('POST', function () {

        it('must NOT responds to /test/simple/get', function test(done) {
            request(config.server)
                .post('/test/simple/get')
                .expect(404, done);
        });
        it('must NOT responds to /not/existed/path', function test(done) {
            request(config.server)
                .post('/not/existed/path')
                .expect(404, done);
        });
        it('must NOT responds to /test/ErrorExample', function test(done) {
            request(config.server)
                .post('/test/ErrorExample')
                .expect(404, done);
        });
        it('must NOT responds to /test/simple/put', function test(done) {
            request(config.server)
                .post('/test/simple/put')
                .expect(404, done);
        });
        it('must responds to /test/callback/example', function test(done) {
            request(config.server)
                .post('/test/callback/example')
                .send({message: 'Hello, Callback!'})
                .expect(200, done);
        });
        it('must responds to /test/callback/example by body of request', function test(done) {
            var body = {message: 'Hello, Callback!'};

            request(config.server)
                .post('/test/callback/example')
                .send(body)
                .expect(200, body)
                .end(done);
        });

    });
};
