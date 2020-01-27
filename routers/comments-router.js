const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments-controllers");
const { routeNotFound, invalidMethod } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(invalidMethod);

// commentsRouter.all("/*", (err, req, res, next) => {
//   res.status(405).send({ msg: "Method Not Found status code" });
// });

module.exports = commentsRouter;
