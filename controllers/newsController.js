const axios = require('axios');
const NewsArticle = require('../models/news');


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
