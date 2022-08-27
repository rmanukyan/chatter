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
      //this code will fail unless you already have files/transfers/ directory
        fs.mkdirSync(dir);
    }

    cb(null, dir);

  }, 
  filename: function (req, file, cb) {

    cb(null, file.originalname);

  },
});
/** I noticed sometimes variables are declared with vars in your code (it's not deprecated but usually devs avoid using it)
https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/
and also with a 'let' keyword and never reassigned. **/
var upload = multer({ storage: storage });

router.route("/file").post(protect, upload.single("file"), transfer);

module.exports = router;
