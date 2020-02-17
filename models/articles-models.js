const connection = require("../db/connection");

exports.selectArticlesById = ({ article_id }) => {
  return connection("articles")
    .select("articles.*")
    .where("articles.article_id", article_id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.comment_id" })
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "article does not exist!" });
      } else {
        // const parsedArticle = article.map(obj => {
        //   const articleObj = { ...obj };
        //   articleObj.comment_count = +articleObj.comment_count;
        //   return articleObj;
        // });
        // return parsedArticle[0];
        return article[0];
      }
    });
};

exports.updateArticleById = ({ article_id }, { inc_votes }) => {
  return connection("articles")
    .select("*")
    .increment("votes", inc_votes || 0)
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
};

exports.insertComment = ({ article_id }, { username, body }) => {
  if (body && username) {
    return connection("comments")
      .insert({ author: username, body: body, article_id: article_id })
      .returning("*")
      .then(comment => {
        return comment[0];
      });
  } else return Promise.reject({ status: 400, msg: "input data missing" });
};

exports.selectCommentsByArticleId = ({ article_id }, { sort_by, order }) => {
  if (order && order !== "asc" && order !== "desc") {
    return Promise.reject({
      status: 400,
      msg: "order input invalid"
    });
  } else {
    return connection("articles")
      .select("*")
      .where("article_id", article_id)
      .then(article => {
        if (article.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "article does not exist"
          });
        } else {
          return connection("comments")
            .select("comment_id", "votes", "created_at", "author", "body")
            .where("article_id", article_id)
            .orderBy(sort_by || "created_at", order || "desc");
        }
      })
      .then(comments => {
        return comments;
      });
  }
};

exports.selectAllArticles = ({
  sort_by,
  order,
  author,
  topic,
  limit = 10,
  p = 1
}) => {
  if (order && order !== "asc" && order !== "desc") {
    return Promise.reject({
      status: 400,
      msg: "order input invalid"
    });
  } else {
    return connection("articles")
      .select(
        "articles.author",
        "title",
        "articles.article_id",
        "topic",
        "articles.created_at",
        "articles.votes"
      )
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .count({ comment_count: "articles.article_id" })
      .orderBy(sort_by || "created_at", order || "desc")
      .modify(query => {
        if (author) query.where("articles.author", author);
        if (topic) query.where("topic", topic);
      })
      .limit(limit)
      .offset((p - 1) * limit)
      .returning("*")
      .then(articles => {
        if (articles.length !== 0) {
          return articles;
        } else if (topic) {
          return connection("topics")
            .select("*")
            .where("slug", topic)
            .then(arr => {
              if (arr.length === 0) {
                return Promise.reject({
                  status: 404,
                  msg: "topic does not exist"
                });
              } else {
                return articles;
              }
            });
        } else if (author) {
          return connection("users")
            .select("*")
            .where("username", author)
            .then(arr => {
              if (arr.length === 0) {
                return Promise.reject({
                  status: 404,
                  msg: "author does not exist"
                });
              } else {
                return articles;
              }
            });
        } else {
          return articles;
        }
      });
  }
};
