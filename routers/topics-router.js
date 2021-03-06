const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-controllers");
const { routeNotFound } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getTopics)
  .all((req, res, next) => {
    res.status(405).send({ msg: "invalid method" })
  });

// topicsRouter.all("/*", (err, req, res, next) => {
//   res.status(405).send({ msg: "Method Not Found status code" });
// });

module.exports = topicsRouter;
