
var Request = require('requestify');

function alert(eventdict, callback){
    return Request.post(callback, eventdict)
        .then(function(response) {
            var body = response.getBody();
            return (body && body.result == 1) ? 1 : 0;
        })
        .catch(function(error){
            return -1;
        });
}


module.exports = {
    alert: alert
};