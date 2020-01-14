const { selectArticlesById } = require("../models/articles-models");

exports.getArticleById = (req, res, next) => {
  selectArticlesById(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
