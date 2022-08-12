const ErrorResponse = require("../utils/errorResponse");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad id format
  if (err.name === "CastError") {
    const message = `Room with id ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  } else if (err.code === 11000) {
    const message = `Room already exists`;
    error = new ErrorResponse(message, 400);
  }

  return res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
