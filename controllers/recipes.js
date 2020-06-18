const asyncHandler = require("../handlers/async-handler");

module.exports = (db) => {
  return {
    getSingle: asyncHandler(async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      let recipe = await db.recipe.findByPk(id);
      console.log(recipe, id);

      res.json({
        success: true,
        data: recipe.toJSON(),
      });
    }),
    getAll: asyncHandler(async (req, res, next) => {
      let recipes = await db.recipe.findAll();
      let data = recipes.map((recipe) => recipe.toJSON());

      res.json({
        success: true,
        data,
      });
    }),
    create: asyncHandler(async (req, res, next) => {
      let recipe = await db.recipe.create(req.body);
      res.json({
        success: true,
        data: recipe,
      });
    }),
    update: asyncHandler(async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      await db.recipe.update(req.body, {
        where: { id },
      });
      res.json({
        success: true,
      });
    }),
    deleteSingle: asyncHandler(async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      await db.recipe.destroy({
        where: { id },
      });
      res.json({
        success: true,
      });
    }),
  };
};
