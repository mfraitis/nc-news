errorController = (req, res, next) => {
  return next({ status: 404, msg: "Route Not Found" });
};

module.exports = errorController;
