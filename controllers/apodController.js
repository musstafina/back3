const axios = require('axios');
const APOD = require('../models/apod');


exports.renderInputForm = (req, res) => {
  res.render('apodInputForm');
};

exports.getAPOD = async (req, res) => {
  try {
    const { date } = req.query; 

    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=gx4UUqR0d5fjbelmO7BkXoDXOj5bL4SmWfmf20CP&date=${date}`);

    const apodData = {
      date: date,
      title: response.data.title,
      imageUrl: response.data.url,
      explanation: response.data.explanation
    };
    const apod = new APOD(apodData);
    await apod.save();

    res.render('apod', { apodData });
  } catch (error) {
    console.error('Error fetching APOD:', error);
    res.status(500).send('Error fetching APOD');
  }
};
