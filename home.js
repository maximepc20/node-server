const utils          = require('./utils');
const meteo          = require('./app-meteo');

var handling = (app) => {

    app.post('/', (req, res) => {
        var address = req.body.address;
        var code = 200;
        var resultString = "";

        meteo.get('c', address, (resultatMeteo) => {
            //console.log("resMeteo: ", resultatMeteo.temperature);
            var result = { code: code, temperature: resultatMeteo.temperature, apptemperature: resultatMeteo.appTemperature, reason: "" }
            resultString = JSON.stringify(result);
            res.send(resultString);
        });

        utils.ecrireLog(`POST: ${address} : ${resultString}`);

    });

    app.get('/', (req, res) => {
        // res.send('<h1>Hello Express</h1>');
        res.render('home.hbs', {
            pageTitle : 'Bienvenue',
            pageMessage: 'Cet app est faite avec NODE.JS'
        });
    });


};

module.exports = {
    handling: handling
}
