const endpoints = require("../endpoints.js");

exports.getEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};
