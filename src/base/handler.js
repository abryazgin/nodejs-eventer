var Logger = require('./logger')(module);


function error(message){
    res.status(400);
    Logger.error(message);
    res.send({ error: message });
    return;
}

function handler404 (req, res, next){
    res.status(404);
    Logger.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
};

function handler500 (err, req, res, next){
    res.status(err.status || 500);
    Logger.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
};

module.exports = {
    handler404: handler404,
    handler500: handler500,
    error: error
};
