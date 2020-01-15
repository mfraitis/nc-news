const express = require("express");
const server = express();
const apiRouter = require("./routers/api-router");

server.use(express.json());
server.use("/api", apiRouter);
server.use((err, req, res, next) => {
  if (err.code) {
    console.log(err.code);
    const errRef = {
      "22P02": "invalid data type",
      "22003": "out of range",
      "23503": "no reference available to data provided",
      "42703": "invalid column"
    };
    res.status(400).send({ msg: errRef[err.code] });
  } else next(err);
});

server.use((err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
});

module.exports = server;
