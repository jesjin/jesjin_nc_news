const express = require('express');
const { getTopics } = require('./controllers/topicController');

const app = express();

app.get('/api/topics', getTopics);
app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad Request' });
  } else {
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

module.exports = app;