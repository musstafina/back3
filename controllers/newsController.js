const axios = require('axios');
const NewsArticle = require('../models/news');
const History = require('../models/history');



exports.renderInputForm = (req, res) => {
  res.render('newsForm');
};

exports.getTopHeadlines = async (req, res) => {
  try {
    const { country, category } = req.query; 

    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        apiKey: '1567fb875a4f48ff80824a23999650a0', 
        country,
        category
      }
    });

    const articles = response.data.articles.slice(0, 10); 
    const firstArticle = articles[0]; // Get the first article

    await logRequestToHistory('News', req.query, firstArticle); // Save only the first article

    
    articles.forEach(async article => {
        const newsArticle = new NewsArticle({
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: article.publishedAt,
          country: country,
          category: category,
          createdAt: new Date() 
        });
        await newsArticle.save();
      });
  
    
    res.render('news', { articles });
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    res.status(500).send('Error fetching top headlines');
  }
};

async function logRequestToHistory(apiName, requestData, responseData) {
  try {
    const historyEntry = new History({
      apiName,
      requestData,
      responseData:  [responseData]
    });
    await historyEntry.save();
  } catch (error) {
    console.error('Error saving request to history:', error);
  }
}