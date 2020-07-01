var express = require("express");
let {
  login,
  logout,
  register,
  forgotPassword,
  resetPasswordEmailConfirmation,
  resetPassword,
} = require("../controllers/index").auth;
var router = express.Router();
let passport = require("../config/passport-config");

router.route("/logout").get(logout);
router.route("/reset-password").get(resetPasswordEmailConfirmation);

router.route("/login").post(passport.authenticate("local"), login);
router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);
// /reset-password
module.exports = router;
