const path= require('path')
const express = require('express')
const hbs =require('hbs');
const app = express();
const weather = require('./utils/weather');
const geocode = require('./utils/geocode');

//setting up paths
const newPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(newPath))
//For dynamic sites =>
app.set('view engine', 'hbs') //setting view engine
app.set('views', viewPath) //Changing name and path for views
hbs.registerPartials(partialsPath) //register path fr partials

// HOMEPAGE
app.get('', (req, res) => {
    res.render('index', {
        class: "weather",
        title: 'Weather app',
        name: 'Ashley'})
})
// HELP PAGE
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help"
    })
})
//JSON data
app.get('/weather', (req, response) => {
    if (!req.query.search) {
        return response.render('404', {
            error:'no address',
            title: "No Address Provided"
        })
    }
    const place = req.query.search;
    geocode(place, (err, res) => {
        if (err) {
            return response.send({
                error: err
            })
        }
        weather(res.geometry.coordinates, (error, data) => {
            if (error) {
                return response.send({
                    error: error
                })
            }
            //console.log(data);
            response.send({
                place: res.place_name,
                time: data.observation_time,
                weather_details: data.weather_descriptions[0],
                temp : data.temperature
            }) 
        }) 
    })
})
// ERROR PAGE
app.get('*', (req, res) => {
    res.render('404', {
        title: "Error 404"
    })
})



// SETUP SERVER
app.listen(3000, () => {
    console.log('Server is up')
})
