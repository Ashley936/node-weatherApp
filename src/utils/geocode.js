const request = require('request')
function geocode(address, callback) {
    const geoUrl= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNobGV5LTc4OSIsImEiOiJja3I0bDUyMW0ydHV0Mm5xaHQwNmwycWg4In0.fvHPdljXgxFYb72WEhaPqA&limit=1"
    request({ url: geoUrl, json: true }, (err, {body}={}) => {
        if (err) {
             callback("Connection problem...geocode api")
        } else if (body.error||body.features.length===0) {
             callback("Incorrect place name")
        } else {
           // console.log(res.body.features[0].geometry.coordinates)
            callback(undefined,body.features[0])
        }
        
     })
}
module.exports = geocode;