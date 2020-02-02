exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code) {
    const errRef = {
      "22P02": { msg: "invalid data type", status: 400 },
      "22003": { msg: "out of range", status: 400 },
      "23503": { msg: "no reference available to data provided", status: 422 },
      "42703": { msg: "invalid column", status: 400 },
      "42601": { msg: "psql syntax error", status: 400 },
      "42P01": { msg: "relation does not exist", status: 400 }
    };
    res.status(errRef[err.code].status).send({ msg: errRef[err.code].msg });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.routeNotFound = (req, res, next) => {
  res.status(404).send({ msg: "route not found" });
};
