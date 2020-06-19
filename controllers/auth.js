const asyncHandler = require("../handlers/async-handler");
const errorResponse = require("../handlers/error-response");

module.exports = (db) => {
  return {
    logout: asyncHandler((req, res, next) => {
      res.clearCookie("auth").redirect("/");
    }),
    login: asyncHandler((req, res, next) => {
      console.log(req.user);
      res.json({
        success: true,
      });
    }),
  };
};
