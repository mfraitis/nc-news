const usersRouter = require("express").Router();
const { getUsersByUsername } = require("../controllers/users-controllers");

usersRouter.route("/:username").get(getUsersByUsername);

usersRouter.all("/*", (err, req, res, next) => {
  res.status(405).send({ msg: "Method Not Found status code" });
});
module.exports = usersRouter;
