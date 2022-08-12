const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.route("/register").post(express.json(), register);
router.route("/login").post(express.json(), login);
router.route("/forgotpassword").post(express.json(), forgotPassword);
router.route("/resetpassword/:resettoken").post(express.json(), resetPassword);

module.exports = router;
