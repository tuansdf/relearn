const createHttpError = require("http-errors");

module.exports = (req, res) => {
  throw new createHttpError.NotFound("Invalid route");
};
