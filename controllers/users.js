const asyncHandler = require("../handlers/async-handler");

module.exports = (db) => {
  return {
    getSingle: asyncHandler(async (req, res, next) => {
      let user = await db.user.findByPk(req.params.id);
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }),
    getAll: asyncHandler(async (req, res, next) => {
      let user = await db.user.findAll();
      res.json({
        success: true,
        data: user,
      });
    }),
    create: asyncHandler(async (req, res, next) => {
      let user = await db.user.create(req.body);
      res.json({
        success: true,
        data: user.toPublicJSON(),
      });
    }),
    update: asyncHandler(async (req, res, next) => {
      let user = await db.user.update({
        where: {
          id: req.params.id,
        },
      });
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }),
    deleteSingle: asyncHandler(async (req, res, next) => {
      let user = await db.user.destroy(req.params.id);
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }),
  };
};
