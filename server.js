const express = require("express");
const server = express();
const apiRouter = require("./routers/api-router");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  routeNotFound
} = require("./errors/index");

server.use(express.json());
server.use("/api", apiRouter);
// server.all("/*", routeNotFound);

server.use(handlePsqlErrors);
server.use(handleCustomErrors);
server.use(handleServerErrors);

module.exports = server;

