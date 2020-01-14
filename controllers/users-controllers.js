const { selectUserByUsername } = require("../models/users-models");

exports.getUsersByUsername = (req, res, next) => {
  selectUserByUsername(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};
