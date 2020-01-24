const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/users-controllers");
const { routeNotFound } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUsersByUsername)
  .all(routeNotFound);

// usersRouter.all("/*", (err, req, res, next) => {
//   res.status(405).send({ msg: "Method Not Found status code" });
// });
module.exports = usersRouter;
