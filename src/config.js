var Logger = require('./base/logger')(module);

var config = {
    port: 8000,
    mongourl: 'mongodb://localhost/eventer'
};
Logger.info(config);

module.exports = config;