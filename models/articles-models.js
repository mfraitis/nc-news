const connection = require("../db/connection");

exports.selectArticlesById = ({ article_id }) => {
  return connection("articles")
    .select("articles.*")
    .where("articles.article_id", article_id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "articles.article_id" })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist!" });
      } else {
        const parsedArticle = article.map(obj => {
          const articleObj = { ...obj };
          articleObj.comment_count = +articleObj.comment_count;
          return articleObj;
        });
        return parsedArticle[0];
      }
    });
};

exports.updateArticleById = ({ article_id }, body) => {
  const inc_votes = body.inc_votes;
  if (inc_votes && Object.keys(body).length === 1) {
    return connection("articles")
      .select("*")
      .increment("votes", inc_votes)
      .where("article_id", article_id)
      .returning("*")
      .then(article => {
        if (article.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "article does not exist"
          });
        }
        return article[0];
      });
  } else return Promise.reject({ status: 400, msg: "invalid body provided" });
};

exports.insertComment = ({ article_id }, { username, body }) => {
  if (body && username) {
    return connection("comments")
      .insert({ author: username, body: body, article_id: article_id })
      .returning("body")
      .then(comment => {
        return comment[0];
      });
  } else return Promise.reject({ status: 400, msg: "input data missing" });
};

exports.selectCommentsByArticleId = ({ article_id }, { sort_by, order }) => {
  return connection("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "no comments for this article"
        });
      } else return comments;
    });
};
