const express = require('express');
const { getTopics } = require('./controllers/topicController');
const { getApiEndPoints } = require('./controllers/apiController');
const { getArticleById, getAllArticles, getCommentsByArticleId } = require('./controllers/articleController');

const app = express();

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:article_id', getArticleById);
app.get('/api/topics', getTopics);
app.get('/api', getApiEndPoints);

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' });
  } else if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

module.exports = app;