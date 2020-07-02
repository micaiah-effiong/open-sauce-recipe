const jwt = require("jsonwebtoken");
const asyncHandler = require("../handlers/async-handler");
const errorResponse = require("../handlers/error-response");

module.exports = (db) => {
  return {
    register: asyncHandler(async function (req, res, next) {
      let user = await db.user.create(req.body);
      res.json({
        success: true,
        data: user.toPublicJSON(),
      });
    }),

    logout: asyncHandler((req, res, next) => {
      req.logout();
      res.redirect("/");
    }),

    login: asyncHandler((req, res, next) => {
      let { user } = req;
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          data: user.toPublicJSON(),
        });
      });
    }),

    forgotPassword: asyncHandler(async function (req, res, next) {
      /*
        user makes a request with POST request
        with e-mail in request body
        genetrate password reset token (to expire in 20hr)
        send token to user e-mail
      */
      let user = await db.user.findOne({
        where: {
          email: req.body.email,
        },
      });

      let passwordResetToken = await user.getResetPasswordToken();
      res.json({
        success: true,
        token: passwordResetToken,
      });
    }),
    resetPasswordEmailConfirmation: asyncHandler(async function (
      req,
      res,
      next
    ) {
      /*
        GET
        reset token is in users req query
        verify and decode the token,
        if decoded email matches user email
      */
      let decoded = await jwt.verify(
        req.query.key,
        process.env.FORGOTTEN_PASSWORD_SECRET
      );

      console.log(decoded);
      res.json({
        success: true,
        data: decoded,
      });
    }),
    resetPassword: asyncHandler((req, res, next) => {
      /*
        find user and update user password entry
      */
    }),
  };
};
