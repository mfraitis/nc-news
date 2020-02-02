const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postComment,
  getCommentsByArticleId,
  getAllArticles
} = require("../controllers/articles-controllers");
const { routeNotFound } = require("../errors/index");

const invalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "invalid method" })
}

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(invalidMethod);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getCommentsByArticleId)
  .all(invalidMethod);

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(invalidMethod);

// articlesRouter.all("/*", (err, req, res, next) => {
//   res.status(405).send({ msg: "Method Not Found status code" });
// });

module.exports = articlesRouter;
