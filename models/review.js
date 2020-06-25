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
          console.log("afterCreate");
          await review.setAvgRating();
        },
        afterUpdate: async function (review, options) {
          console.log("afterUpdate");
          return await review.setAvgRating();
        },
        afterDestroy: async function (review, options) {
          console.log("afterDestroy");
          await review.setAvgRating();
          fn(null, review);
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
    console.log(item.toJSON());
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
