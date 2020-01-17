const connection = require("../db/connection");

exports.updateComment = ({ comment_id }, body) => {
  const inc_votes = body.inc_votes;
  if (inc_votes && Object.keys(body).length === 1) {
    return connection("comments")
      .select("*")
      .increment("votes", inc_votes)
      .where("comment_id", comment_id)
      .returning("*")
      .then(comment => {
        if (comment.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "comment does not exist"
          });
        } else {
          return comment[0];
        }
      });
  } else return Promise.reject({ status: 400, msg: "invalid body provided" });
};

exports.removeComment = ({ comment_id }) => {
  return connection("comments")
    .delete()
    .where("comment_id", comment_id)
    .then(delCount => {
      if (delCount === 0) {
        return Promise.reject({ status: 400, msg: "no comment found" });
      }
    });
};
