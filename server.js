const express = require("express");
const server = express();
const apiRouter = require("./routers/api-router");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors
} = require("./errors/index");

server.use(express.json());
server.use("/api", apiRouter);

server.use(handlePsqlErrors);

server.use(handleCustomErrors);
server.use(handleServerErrors);
server.all("/*", (err,req, res, next) => {
  res.status(404).send({ msg: "route not found" });
});
module.exports = server;
