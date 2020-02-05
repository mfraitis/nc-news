const {
  selectUserByUsername,
  selectAllUsers
} = require("../models/users-models");

exports.getUsersByUsername = (req, res, next) => {
  selectUserByUsername(req.params)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  selectAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};
