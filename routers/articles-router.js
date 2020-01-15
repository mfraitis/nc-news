const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postComment
} = require("../controllers/articles-controllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter.route("/:article_id/comments").post(postComment);

module.exports = articlesRouter;
