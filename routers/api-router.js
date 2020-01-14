const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const errorController = require("../controllers/error-controller");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.all("/*", errorController);

module.exports = apiRouter;
