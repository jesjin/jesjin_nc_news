const {
  getArticleById,
  fetchAllArticles,
  fetchCommentsByArticleId,
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
  fetchAllArticles()
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
