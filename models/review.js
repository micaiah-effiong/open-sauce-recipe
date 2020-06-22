module.exports = function (sequelize, DataType) {
  let model = sequelize.define(
    "review",
    {
      words: {
        type: DataType.STRING,
        allowNull: true,
      },
      rating: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      to: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: async function (review, option) {
          let type = `${review.to}`;
          let typeID = `${type}Id`;
          let _update = await model.findAll({
            where: {
              [typeID]: review.id,
              to: type,
            },
            attributes: ["rating"],
            include: [
              [db.sequelize.fn("SUM", sequelize.col("rating")), "avg_ratings"],
            ],
            raw: true,
          });
          console.log(_update);
        },
      },
    }
  );

  // instance methods
  // model.prototype.methodName

  // class methods
  // model.methodName

  return model;
};

/*
  - words
  - rating
-- recipe || variation id
-- user id

*/
