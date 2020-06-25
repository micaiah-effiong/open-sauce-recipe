const asyncHandler = require("../handlers/async-handler");

module.exports = (db) => {
  return {
    getSingle: asyncHandler(async (req, res, next) => {
      let id = Number(req.params.id);
      let user = await db.user.findByPk(id);
      res.json({
        success: true,
        data: user.toPublicJSON(),
      });
    }),

    getAll: asyncHandler(async (req, res, next) => {
      let users = await db.user.findAll();
      let data = users.map((user) => user.toPublicJSON());
      res.json({
        success: true,
        data,
      });
    }),

    update: asyncHandler(async (req, res, next) => {
      let id = Number(req.params.id);
      let user = await db.user.update(req.body, {
        where: {
          id,
        },
      });
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }),

    deleteSingle: asyncHandler(async (req, res, next) => {
      let id = Number(req.params.id);
      let user = await db.user.destroy(id);
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }),
  };
};
