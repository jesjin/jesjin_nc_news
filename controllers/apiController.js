const endpoints = require('../endpoints.json');

exports.getApiEndPoints = (req, res, next) => {
  res.status(200).send(endpoints);
};