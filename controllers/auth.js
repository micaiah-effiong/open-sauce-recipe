const asyncHandler = require("../handlers/async-handler");
const errorResponse = require("../handlers/error-response");

module.exports = (db) => {
  return {
    register: asyncHandler(async (req, res, next) => {
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
  };
};
