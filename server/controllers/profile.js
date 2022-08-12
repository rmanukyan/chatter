const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");
const fs = require("fs");
const logger = require("../utils/logger");

exports.ava = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    logger.info(`FILE NAME: ${req.file.filename}`);

    if (!user) {
      return next(
        new ErrorResponse(`User with id ${req.user.id} not found`, 404)
      );
    }

    // delete old file
    // const oldFile = "./files/" + user.ava;
    // try {
    //   fs.unlinkSync(oldFile);
    // } catch (err) {
    //   console.log("Error while removing file..", oldFile);
    //   console.log(err);
    // }

    user.ava = req.file.filename;

    await user.save();

    return res.status(201).json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(
        new ErrorResponse(`User with id ${req.user.id} not found`, 404)
      );
    }

    const profile = {
      name: user.name,
      email: user.email,
      role: user.role,
      memberSince: user.createdAt,
      ava: user.ava,
    };

    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};
