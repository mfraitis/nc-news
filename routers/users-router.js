const usersRouter = require("express").Router();
const { getUsersByUsername, getAllUsers } = require("../controllers/users-controllers");
const { routeNotFound } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUsersByUsername)
  .all((req, res, next) => {
    res.status(405).send({ msg: "invalid method" });
  });

usersRouter
  .route("/")
  .get(getAllUsers)
  .all((req, res, next) => {
    res.status(405).send({ msg: "invalid method" });
  });

// usersRouter.all("/*", (err, req, res, next) => {
//   res.status(405).send({ msg: "Method Not Found status code" });
// });
module.exports = usersRouter;
