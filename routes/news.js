const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/', newsController.renderInputForm);

router.get('/fetch', newsController.getTopHeadlines);

module.exports = router;
