const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publiDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve static content
app.use(express.static(publiDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shweta More'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Shweta!',
        desg: 'Web Developer',
        name: 'Shweta More'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shweta More',
        msg: 'This is a help page'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must enter an address"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
                return res.send({ error });
    
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location        
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        error: "Help article not found",
        name: 'Shweta More'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: "Page not found",
        name: 'Shweta More'
    });
});

app.listen(3000, () => {
    console.log('Server is up and running.');
});