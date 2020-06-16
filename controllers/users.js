const asyncHandler = require("../handlers/async-handler");
const _ = require("underscore");

module.exports = (db) => {
  return {
    getSingle: asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      id = Number(id);
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
        count: data.length,
      });
    }),
    create: asyncHandler(async (req, res, next) => {
      const {
        body: { firstname, lastname, country, email, password },
      } = req;

      let user = await db.user.create({
        firstname,
        lastname,
        country,
        email,
        password,
      });
      res.json({
        success: true,
        data: user.toPublicJSON(),
      });
    }),
    update: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let cleanBody = _.omit(
        body,
        "salt",
        "hash",
        "createdAt",
        "updatedAt",
        "password",
        "role"
      );
      const { id } = req.params;
      id = Number(id);
      let data = await db.user.update(cleanBody, {
        where: {
          id: req.params.id,
        },
      });
      res.json({
        success: true,
        data,
      });
    }),
    deleteSingle: asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      id = Number(id);
      let data = await db.user.destroy({ where: { id } });
      res.json({
        success: true,
      });
    }),
  };
};
