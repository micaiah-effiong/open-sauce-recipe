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
        validate: {
          min: 1,
          max: 5,
        },
      },
      to: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: async function (review, options) {
          await review.setAvgRating();
        },
        afterUpdate: async function (review, options) {
          return await review.setAvgRating();
        },
        afterDestroy: async function (review, options) {
          await review.setAvgRating();
        },
      },
    }
  );

  // instance methods
  // model.prototype.methodName

  /*
   * @descr calls average rating method of the item reviewed
   */
  model.prototype.setAvgRating = async function () {
    let item = (await this.getRecipe()) || (await this.getVariation());
    await item.avgRating();
  };

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
