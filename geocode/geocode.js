const request = require('request');

var geocodeAddress = (address, apiKey, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&address=${encodedAddress}`,
            json:true
        }, (error, response, body) => {
            //console.log(JSON.stringify(body, undefined, 2));
            if(error)
            {
                callback('Unable to connect to the google API.');
            }
            else if (body.status === 'ZERO_RESULTS') {
                callback('Unable to find that address.');
            }
            else if (body.status === 'OK'){
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
    });
};

module.exports = {
    geocodeAddress: geocodeAddress
}
