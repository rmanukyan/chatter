const express = require("express");
const router = express.Router();
const fs = require('fs');

const { protect } = require("../middleware/auth");
const { transfer } = require("../controllers/transfer");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'files/transfers/' + req.user.id;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    cb(null, dir);

  }, 
  filename: function (req, file, cb) {

    cb(null, file.originalname);

  },
});

var upload = multer({ storage: storage });

router.route("/file").post(protect, upload.single("file"), transfer);

module.exports = router;
