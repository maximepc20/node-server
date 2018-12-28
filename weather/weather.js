const request = require('request');

var getTemperature = (latlng, apiKey, callback) => {
    request({
            url: `https://api.darksky.net/forecast/${apiKey}/${latlng.latitude},${latlng.longitude}`,
            json:true
        }, (error, response, body) => {
            //console.log(JSON.stringify(body, undefined, 2));
            if(error)
            {
                callback('Unable to connect to the DarkSky API.');
            }
            else if (body.code === 400) {
                callback('The given location is invalid.');
            }
            else {
                callback(undefined, {
                    temperatureF: round(body.currently.temperature,0),
                    apparentTemperatureF: round(body.currently.apparentTemperature,0),
                    temperatureC: round((body.currently.temperature - 32) / 1.8, 0),
                    apparentTemperatureC: round((body.currently.apparentTemperature- 32) / 1.8, 0)
                });
            }
    });
};

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

module.exports = {
    getTemperature: getTemperature
}
