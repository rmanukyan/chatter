const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const logger = require("../utils/logger");

// not working ;( Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
const asyncHandler = require("../middleware/async");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });

    return sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // check if password matches
    logger.info(`entered pass: ${password}`);
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    return sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorResponse("There is no user with that email", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const message = `Use this token to reset password: ${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password email token",
        message: message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (err) {
      logger.error(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
/**
 * I tried to understand why you set a cookie in the response and I haven't figured it out.
 * The api, websockets and client authenticate users by token in headers or url(websockets).
 * But what is the role of cookies in this application?
 * To me it looks like you tried to implement different strategies for users' authorization/authentication, ended up
 * with bearer-token-in-headers-based one and forgot to remove the cookies logic...
 */
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      data: {
        token: token,
        username: user.name,
        email: user.email,
        userId: user._id,
        ava: user.ava,
      },
    });
};
