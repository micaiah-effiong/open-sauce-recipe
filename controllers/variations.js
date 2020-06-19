const asyncHandler = require("../handlers/async-handler");

module.exports = (db) => {
  return {
    getSingle: asyncHandler(async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      let variation = await db.variation.findByPk(id);
      res.json({
        success: true,
        data: variation.toJSON(),
      });
    }),
    getAll: asyncHandler(async (req, res, next) => {
      let variations = await db.variation.findAll();
      let data = variations.map((variation) => variation.toJSON());

      res.json({
        success: true,
        data,
      });
    }),
    create: asyncHandler(async (req, res, next) => {
      let variation = await db.variation.create(req.body);
      res.json({
        success: true,
        data: variation,
      });
    }),
    update: asyncHandler(async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      await db.variation.update(req.body, {
        where: { id },
      });
      res.json({
        success: true,
      });
    }),
    deleteSingle: asyncHandler(async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      await db.variation.destroy({
        where: { id },
      });
      res.json({
        success: true,
      });
    }),
  };
};
