const express = require('express');
const { getTopics } = require('./controllers/topicController');
const { getApiEndPoints } = require('./controllers/apiController');

const app = express();

app.get('/api/topics', getTopics);
app.get('/api', getApiEndPoints);

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

module.exports = app;