const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postComment,
  getCommentsByArticleId,
  getAllArticles
} = require("../controllers/articles-controllers");
const { routeNotFound } = require("../errors/index");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(routeNotFound);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticleId)
  .all(routeNotFound);

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(routeNotFound);

// articlesRouter.all("/*", (err, req, res, next) => {
//   res.status(405).send({ msg: "Method Not Found status code" });
// });

module.exports = articlesRouter;
