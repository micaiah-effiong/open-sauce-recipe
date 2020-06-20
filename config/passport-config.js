const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models/index");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      let user = await db.user.findOne({ where: { email } });
      if (!user) return done(null, false);
      if (!(await user.verifyPassword(password))) return done(null, false);
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  let user = await db.user.findByPk(id);
  if (!user) return done(err, null);
  done(null, user);
});

module.exports = passport;
