const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments-controllers");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById);

commentsRouter.all("/*", (err, req, res, next) => {
  res.status(405).send({ msg: "Method Not Found status code" });
});

module.exports = commentsRouter;
