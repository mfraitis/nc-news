const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postComment,
  getCommentsByArticleId,
  getAllArticles
} = require("../controllers/articles-controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticleId);

articlesRouter.route("/").get(getAllArticles);

module.exports = articlesRouter;
