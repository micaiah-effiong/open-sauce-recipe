var express = require("express");
let { login, logout, register } = require("../controllers/index").auth;
var router = express.Router();
let passport = require("../config/passport-config");

router.route("/logout").get(logout);
router.route("/login").post(passport.authenticate("local"), login);
router.route("/register").post(register);

module.exports = router;
