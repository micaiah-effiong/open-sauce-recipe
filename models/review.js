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
        afterCreate: async function (review, options) {
          await setAvgRating(review);
        },
        afterUpdate: async function (review, options) {
          await setAvgRating(review);
        },
        afterDestroy: async function (review, options) {
          await setAvgRating(review);
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

async function setAvgRating(instance) {
  let item = (await instance.getRecipe()) || (await instance.getVariation());
  await item.avgRating();
  console.log(item.toJSON());
}

/*
  - words
  - rating
-- recipe || variation id
-- user id

*/
