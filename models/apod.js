const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apodSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const APOD = mongoose.model('apod', apodSchema);

module.exports = APOD;
