const fs            = require('fs');

var ecrireLog = (message) => {
    var now = new Date().toString();
    var log = `${now}: ${message}`;
    fs.appendFileSync('server.log', log + '\n', (err) => {
        console.log('Unable to append to server: ', err);
    });
    console.log(log);

};

module.exports = {
    ecrireLog: ecrireLog
}
