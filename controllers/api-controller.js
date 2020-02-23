const endpoints = require("../endpoints.JSON");

exports.getEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints });
};
