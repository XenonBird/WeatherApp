const express = require('express')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const pug = require('pug')

const app = express()

// app.set('view engine' , 'ejs')
app.set('view engine', 'pug')
app.set('views' , path.join(__dirname, 'views'))

app.use('/public', express.static('./public'))
app.use('/bs', express.static('./node_modules/bootstrap/'))

const lat = '27.2046'
const lon = '77.4977'
const APIkey = '6e3289d51305e72d14b8782662f87655'


app.get('/', (req, res) => {
    let weatherData;
    axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`)
        .then(response => {
            weatherData = response.data
            // res.send(weatherData)

            let options = {
                title: 'Weather | Live',
                data: weatherData
            }
            res.render('index', options)

            // console.log(weatherData.timezone);

            // let time = new Date(weatherData.current.dt * 1000)

        })
        .catch(err => {
            console.log(`Error: ${err}`)

            weatherData = JSON.parse(fs.readFileSync('./database/weatherData.json'))
            // console.log(weatherData);
            res.send(weatherData)
        })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}