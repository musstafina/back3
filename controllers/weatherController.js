const axios = require('axios');

exports.getWeather = async (req, res) => {
    try {
        const cityName = req.body.cityName;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b2984a6c500044dff2a8fc55eabd02be&units=metric`;
        const response = await axios.get(weatherUrl);
        res.render('weather', { weatherData: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};