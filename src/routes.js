
function register(app) {
    app.put('/api/event/:id', function (req, res) {
        res.send('This is not implemented now');
    });

    app.get('/simple', function (req, res) {
        res.send('This is not implemented now');
    });

    app.get('/ErrorExample', function (req, res, next) {
        next(new Error('Random error!'));
    });
}

module.exports = register;