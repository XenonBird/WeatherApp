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

const lat = '-33.8688'
const lon = '151.2093'
const APIkey = '6e3289d51305e72d14b8782662f87655'


app.get('/', (req, res) => {
    // let weatherData;
    // axios
    //     .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    //     .then(response => {
    //         weatherData = response.data
    //     })
    //     .catch(err => {
    //         console.log(`Error: ${err}`)

    //         weatherData = JSON.parse(fs.readFileSync('./database/weatherData.json'))

    //     })
    let weatherData = JSON.parse(fs.readFileSync('./database/weatherData.json'))

    let options = {
        title: "Weather Data",
        data: weatherData
    }
    
    res.render('index', options)

})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}