const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

module.exports = (err, req, res, next) => {
  // 11000 is a mongodb error
  if (err.code === 11000) {
    err.statusCode = StatusCodes.BAD_REQUEST;
    err.message = "Duplicated values entered for " + Object.keys(err.keyValue);
  }

  // CastError is a mongodb error
  else if (err.name === "CastError") {
    err.statusCode = StatusCodes.NOT_FOUND;
    err.message =
      err.message.split("for model ")[1].replaceAll('"', "") + " not found";
  }

  // ValidationError is a mongodb error
  else if (err.name === "ValidationError") {
    err.message = Object.values(err.errors)
      .map((e) => e.message)
      .join(". ");
    err.statusCode = StatusCodes.BAD_REQUEST;
  }

  // BSONTypeError
  else if (
    err.message ===
    "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
  ) {
    err.statusCode = StatusCodes.NOT_FOUND;
    err.message = "Not found";
  }

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong. Try again later.",
    err,
  });
};
