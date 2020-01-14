const connection = require("../db/connection");

exports.selectTopics = () => {
  return connection("topics")
    .select("*")
    .then(topics => {
      if (topics.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No Topics!"
        });
      } else return topics;
    });
};
