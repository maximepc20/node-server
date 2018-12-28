const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const ApiKeyGoogle  = 'AIzaSyC6meeV-uLPyNVLtQcGFce2U169ZcMYgTE';
const APIKeyDarkSky = '71beef144305bc52655c07a99d39bc1e';

var get = (metrique, address, callback) => {

    var resultatMeteo =  {
        temperature: undefined,
        appTemperature: undefined
    }

    geocode.geocodeAddress(address, ApiKeyGoogle, (errorMessage, results) => {
        if(errorMessage){
            console.log(errorMessage);
        }
        else {
            weather.getTemperature(results, APIKeyDarkSky, (errorMessage, results) => {
                if(errorMessage){
                    console.log(errorMessage);
                }
                else {

                    if(metrique === "f")
                    {
                        console.log('It\'s', results.temperatureF , '°F but feels like', results.apparentTemperatureF , '°F');
                        resultatMeteo.temperature = results.temperatureF + "°F";
                        resultatMeteo.appTemperature =  results.apparentTemperatureF + "°F";
                    }
                    else {
                        console.log('It\'s', results.temperatureC , '°C but feels like', results.apparentTemperatureC , '°C');
                        resultatMeteo.temperature = results.temperatureC + "°C";
                        resultatMeteo.appTemperature =  results.apparentTemperatureC + "°C";
                    }

                    callback(resultatMeteo);
                }



            });
        }
    });



};

module.exports = {
    get: get
};
