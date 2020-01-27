const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const { getEndpoints } = require("../controllers/api-controller");
const { invalidMethod, routeNotFound } = require("../errors/index");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter
  .route("/")
  .get(getEndpoints)
  .all(invalidMethod);

apiRouter.all("/*", routeNotFound);

module.exports = apiRouter;
