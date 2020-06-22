const asyncHandler = require("../handlers/async-handler");
const errorResponse = require("../handlers/error-response");

module.exports = (db) => {
  return {
    getSingle: asyncHandler(async (req, res, next) => {
      let id = Number(req.params.id);
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
      let { rid: id } = req.params;
      let recipe = await db.recipe.findByPk(id);
      if (!recipe) {
        return next(errorResponse("Bad Request 2", 400));
      }
      let userVariation = await req.user.createVariation(req.body);
      let variation = await recipe.addVariation(userVariation);
      res.json({
        success: true,
        data: userVariation,
      });
    }),

    update: asyncHandler(async (req, res, next) => {
      let id = Number(req.params.id);
      await db.variation.update(req.body, {
        where: { id },
      });
      res.json({
        success: true,
      });
    }),

    deleteSingle: asyncHandler(async (req, res, next) => {
      let id = Number(req.params.id);
      await db.variation.destroy({
        where: { id },
      });
      res.json({
        success: true,
      });
    }),
  };
};
