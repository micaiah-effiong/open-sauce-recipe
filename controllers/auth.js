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
      let user = await db.findOne({
        where: {
          email: req.body.email,
        },
      });

      let passwordResetToken = await user.getResetPasswordToken();
    }),
    resetPasswordEmailConfirmation: asyncHandler((req, res, next) => {
      /*
        GET
        reset token is in users req query
        verify and decode the token,
        if decoded email matches user email
      */
    }),
    resetPassword: asyncHandler((req, res, next) => {
      /*
        find user and update user password entry
      */
    }),
  };
};
