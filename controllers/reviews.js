module.exports = (db) => {
  return {
    getSingle: async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      let review = await db.review.findByPk(id);
      res.json({
        success: true,
        data: review.toJSON(),
      });
    },
    getAll: async (req, res, next) => {
      let reviews = await db.review.findAll();
      let data = reviews.map((review) => review.toJSON());

      res.json({
        success: true,
        data,
      });
    },
    create: async (req, res, next) => {
      let review = await db.review.create(req.body);
      res.json({
        success: true,
        data: review,
      });
    },
    update: async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      await db.review.update(req.body, {
        where: { id },
      });
      res.json({
        success: true,
      });
    },
    deleteSingle: async (req, res, next) => {
      let { id } = req.params;
      id = Number(id);
      await db.review.destroy({
        where: { id },
      });
      res.json({
        success: true,
      });
    },
  };
};
