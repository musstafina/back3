const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  cityName: {
    type: String,
    required: true
  },
  weatherData: {
    type: Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Weather = mongoose.model('weather', weatherSchema);

module.exports = Weather;
