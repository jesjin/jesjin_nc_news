const express = require('express');
const cors = require('cors');
const { getTopics } = require('./controllers/topicController');
const { getApiEndPoints } = require('./controllers/apiController');
const { 
  getArticleById, 
  getAllArticles, 
  getCommentsByArticleId, 
  postCommentByArticleId, 
  patchArticleVotes,
  deleteCommentById,
} = require('./controllers/articleController');
const { getAllUsers } = require('./controllers/userController');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/users', getAllUsers);
app.delete('/api/comments/:comment_id', deleteCommentById);
app.patch('/api/articles/:article_id', patchArticleVotes);
app.post('/api/articles/:article_id/comments', postCommentByArticleId);
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
    console.log(err); 
    res.status(500).send({ msg: 'Internal Server Error' });
  }
});

module.exports = app;