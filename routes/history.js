const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

router.get('/weather/history', historyController.getWeatherHistory);

router.get('/news/history', historyController.getNewsHistory);

router.get('/apod/history', historyController.getAPODHistory);

module.exports = router;
