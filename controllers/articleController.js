const articles = require("../db/data/test-data/articles");
const comments = require("../db/data/test-data/comments");
const {
  getArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
  addCommentByArticleId,
  updateArticleVotes,
  removeCommentById,
} = require("../models/articleModel");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  // check that article id is an integer, if it is not, return an error
  if (!Number.isInteger(Number(article_id))) {
    return res
      .status(400)
      .send({ msg: "Bad Request - Article ID was invalid." });
  }
  getArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { topic } = req.query;
  fetchAllArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  if (!Number.isInteger(Number(article_id))) {
    return res
      .status(400)
      .send({ msg: "Bad Request - Article ID was invalid." });
  }
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!Number.isInteger(Number(article_id))) {
    return res
      .status(400)
      .send({ msg: "Bad Request - Article ID was invalid." });
  }
  if (!username || !body) {
    return res
      .status(400)
      .send({ msg: "Bad Request - Missing required fields." });
  }

  addCommentByArticleId(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  if (!Number.isInteger(Number(article_id))) {
    return res.status(400).send({ msg: 'Bad Request - Article ID was invalid.' });
  }
  if (typeof inc_votes !== 'number') {
    return res
      .status(400)
      .send({ msg: "Bad Request - inc_votes must be a number." });
  }
  updateArticleVotes(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
  }