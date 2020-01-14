const express = require("express");
const server = express();
const apiRouter = require("./routers/api-router");

server.use(express.json());
server.use("/api", apiRouter);
server.use((err, req, res, next) => {
  if (!err.code) {
    res.status(err.status).send({ msg: err.msg });
  } else console.log("err>", err);
});

module.exports = server;
