const request = require('request')

function weather(data, callback) {
    const url = "http://api.weatherstack.com/current?access_key=1c826abca8ce8cedf7d5a721b724355d&query=" + data[0] + "," + data[1]
    request({ url, json: true }, (err, {body}={}) => {
        if (err) {
            callback("Connection problem...weather api")
        } else if (body.error) {
            callback("Incorrect input.... weather api")
        } else {
            callback( undefined,body.current)
        }
    })
}
module.exports = weather;