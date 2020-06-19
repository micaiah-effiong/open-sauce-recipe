var express = require("express");
let { login, logout } = require("../controllers/index").auth;
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (email, password, done) {
    let user = await db.user.findOne({ where: { email } });
    if (!user) return done(null, false);
    if (!(await user.verifyPassword(password))) return done(null, false);
    return done(null, user);
  })
);

router.route("/").get(logout);
router.route("/").post(passport.authenticate("local"), login);

module.exports = router;
