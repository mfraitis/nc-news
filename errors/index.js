exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code) {
    console.log(err.code);
    const errRef = {
      "22P02": "invalid data type",
      "22003": "out of range",
      "23503": "no reference available to data provided",
      "42703": "invalid column",
      "42601": "psql syntax error",
      "42P01": "relation does not exist"
    };
    res.status(400).send({ msg: errRef[err.code] });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  res.status(err.status).send({ msg: err.msg });
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.routeNotFound = (req, res, next) => {
  return next({ status: 404, msg: "Route Not Found" });
};
