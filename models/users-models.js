const connection = require("../db/connection");

exports.selectUserByUsername = ({ username }) => {
  return (
    connection("users")
      .select("*")
      .where("username", username)
      // .returning("*")
      .then(user => {
        if (user.length === 0) {
          return Promise.reject({ status: 404, msg: "user does not exist!" });
        } else return user[0];
      })
  );
};

exports.selectAllUsers = () => {
  return connection("users")
    .select("*")
    .then(users => {
      return users;
    });
};
