const connection = require("../db/connection");

exports.selectUserByUsername = ({ username }) => {
  return (
    connection("users")
      .select("*")
      .where("username", username)
      // .returning("*")
      .then(user => {
        if (user.length === 0) {
          return Promise.reject({ status: 404, msg: "User Does Not Exist!" });
        } else return user[0];
      })
  );
};
