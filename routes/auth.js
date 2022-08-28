var express = require("express");

var router = express.Router();

const {
  signUpController,
  loginController,
} = require("../controllers/aunthentication");
const { checkAuth } = require("../middleware/auth_validate");
router.post("/signup", checkAuth, signUpController);
router.post("/login", loginController);
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

module.exports = router;
