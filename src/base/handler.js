var log = require('./logger')(module);

function handler404 (req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
};

function handler500 (err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
};

module.exports = {
    handler404: handler404,
    handler500: handler500
};
