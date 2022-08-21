const ErrorResponse = require("../utils/errorResponse");
const logger = require("../utils/logger");

exports.transfer = async (req, res, next) => {
  try {
    // logger.info(`FILE NAME: ${req.body}`);
    // logger.info(`FILE NAME: ${req.fl}`);

    return res.status(201).json({ success: true, data: 'transfers/' + req.user.id + '/' + req.file.originalname});
  } catch (err) {
    next(err);
  }
};


