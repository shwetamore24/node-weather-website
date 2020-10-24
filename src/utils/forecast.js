const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=768047eabea8be1cccee6397ec8138e7&query='+latitude+','+longitude+'&units=f';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather Service!', undefined);
        } else if(body.error) {
            callback('Unable to find the location', undefined);
        } else {
            const forecastString = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`;
            callback(undefined, forecastString);
            // console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`);
        }    
    });
}

module.exports = forecast;