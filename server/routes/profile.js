const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { ava, profile } = require("../controllers/profile");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + "-" + "ava.jpg");
  },
});

var upload = multer({ storage: storage });

router.route("/ava").post(protect, upload.single("ava"), ava);
router.route("/").get(protect, profile);

module.exports = router;
