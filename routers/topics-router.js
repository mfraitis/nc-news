const topicsRouter = require("express").Router();
const { getTopics } = require("../controllers/topics-controllers");
const { routeNotFound, invalidMethod } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getTopics)
  .all(invalidMethod);

// topicsRouter.all("/*", (err, req, res, next) => {
//   res.status(405).send({ msg: "Method Not Found status code" });
// });

module.exports = topicsRouter;
