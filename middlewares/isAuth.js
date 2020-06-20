const errorResponse = require("../handlers/error-response");

module.exports = (req, res, next) => {
  if (!req.user)
    return next(errorResponse("User has not been authenticated", 401));

  return next();
};
