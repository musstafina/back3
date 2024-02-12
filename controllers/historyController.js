const History = require('../models/history');

exports.getWeatherHistory = async (req, res) => {
    try {
        const weatherHistory = await History.find({ apiName: 'Weather' }).sort({ requestDate: -1 });

        res.render('weatherHistory', { historyEntries: weatherHistory });
    } catch (error) {
        console.error('Error fetching weather history:', error);
        res.status(500).send('Error fetching weather history');
    }
};

exports.getNewsHistory = async (req, res) => {
    try {
        const newsHistory = await History.find({ apiName: 'News' }).sort({ requestDate: -1 });

        res.render('newsHistory', { historyEntries: newsHistory });
    } catch (error) {
        console.error('Error fetching news history:', error);
        res.status(500).send('Error fetching news history');
    }
};

exports.getAPODHistory = async (req, res) => {
    try {
        const apodHistory = await History.find({ apiName: 'APOD' }).sort({ requestDate: -1 });

        res.render('apodHistory', { historyEntries: apodHistory });
    } catch (error) {
        console.error('Error fetching APOD history:', error);
        res.status(500).send('Error fetching APOD history');
    }
};
