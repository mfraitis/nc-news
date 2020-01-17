const { updateComment, removeComment } = require("../models/comments-models");

exports.patchCommentById = (req, res, next) => {
  updateComment(req.params, req.body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  removeComment(req.params)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
