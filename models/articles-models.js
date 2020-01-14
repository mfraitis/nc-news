const connection = require("../db/connection");

exports.selectArticlesById = ({ article_id }) => {
  return connection("articles")
    .select("articles.*")
    .where("articles.article_id", article_id)
    .join("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "articles.article_id" })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Does Not Exist!" });
      } else return article[0];
    });
};
