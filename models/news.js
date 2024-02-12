const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true
  },
  publishedAt: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const NewsArticle = mongoose.model('news', newsArticleSchema);

module.exports = NewsArticle;
