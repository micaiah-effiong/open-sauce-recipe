module.exports = function (sequelize, DataType) {
  let model = sequelize.define("recipe", {
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
      defaultValue: null,
    },
  });
  // instance methods
  // model.prototype.methodName

  // class methods
  // model.methodName

  return model;
};

/*
  - name
  - description
  - items <recipe items>
  - instructions
  - origin
  - avg_rating
-- user id
*/
