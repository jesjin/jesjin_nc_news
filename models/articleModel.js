const db = require("../db/connection");

exports.getArticleById = (article_id, sort_by='created_at', order='desc') => {
  const validSortColumns = ["created_at", "comment_count", "votes"];
  const validOrderValues = ["ASC", "DESC"];

  // Ensure sort_by and order are valid
  if (!validSortColumns.includes(sort_by)) {
    sort_by = "created_at";
  }

  if (!validOrderValues.includes(order.toUpperCase())) {
    order = "DESC";
  }

  return db
    .query(
      `
      SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order.toUpperCase()};
      `,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
      return rows[0];
    });
};

// exports.fetchAllArticles = (topic) => {
  // let queryStr =
  //     `
  //       SELECT articles.author,  articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
  //       COUNT(comments.comment_id) AS comment_count
  //       FROM articles
  //       LEFT JOIN comments ON comments.article_id = articles.article_id
  //     `;

  //     const  queryValues = [];
  //     if(topic) {
  //       queryValues.push(topic);
  //       queryStr += `WHERE articles.topic = $1`;
  //     }

  //     queryStr +=
  //     `
  //       GROUP BY articles.article_id
  //       ORDER BY articles.created_at DESC;
  //     `;
  //   return db
  //   .query(queryStr, queryValues)
  //   .then(({ rows }) => {
  //     return rows;
  //   });

  exports.fetchAllArticles = (topic, sort_by = 'created_at', order = 'desc') => {
    const validSortColumns = ['created_at', 'comment_count', 'votes'];
    const validOrderValues = ['ASC', 'DESC'];
  
    // Ensure sort_by and order are valid
    if (!validSortColumns.includes(sort_by)) {
      sort_by = 'created_at';
    }
  
    if (!validOrderValues.includes(order?.toUpperCase())) {
      order = 'DESC';
    }
  
    let queryStr = `
      SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, 
      COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
    `;
  
    const queryValues = [];
    if (topic) {
      queryValues.push(topic);
      queryStr += `WHERE articles.topic = $1 `;
    }
  
    queryStr += `
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order.toUpperCase()};
    `;
  
    console.log('Executing query:', queryStr, queryValues);
    return db.query(queryStr, queryValues).then(({ rows }) => {
      console.log('Query result:', rows);
      return rows;
    });
  };

exports.fetchCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body, article_id
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addCommentByArticleId = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body)
      VALUES ($1, $2, $3)
      RETURNING *;`,
      [article_id, username, body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateArticleVotes = (article_id, inc_votes) => {
  return db
    .query(
      `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};

exports.removeCommentById = (comment_id) => {
  return db
    .query(
      `DELETE FROM comments
      WHERE comment_id = $1
      RETURNING *;`,
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
    });
};
