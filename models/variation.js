module.exports = function (sequelize, DataType) {
  let model = sequelize.define("variation", {
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100],
      },
    },
    description: {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        len: [3, 100],
      },
    },
    items: {
      type: DataType.JSON,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    instructions: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    origin: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    rating: {
      type: DataType.INTEGER,
      defaultValue: 0,
    },
  });

  // instance methods
  // model.prototype.methodName

  /*
   * @descr calculate and update field with the average rating
   * rating is gotten from the reviews table
   */
  model.prototype.avgRating = async function () {
    let review = await this.getReviews();
    let avgRating = review.reduce((a, b) => a + b.rating, 0) / review.length;
    await model.update(
      { rating: +Number(avgRating).toFixed(1) },
      {
        where: { id: this.id },
      }
    );
  };

  // class methods
  // model.methodName

  return model;
};

/*
  - name
  - description
  - info <recipe items>
  - instructions
  - origin
-- user id
-- recipe
*/
