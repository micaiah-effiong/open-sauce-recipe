module.exports = function (sequelize, DataType) {
  let model = sequelize.define("variation", {
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      // validate length
    },
    description: {
      type: DataType.STRING,
      allowNull: true,
      defaultValue: null,
      // validate length
    },
    items: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },
    instructions: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },
    origin: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },
    avg_rating: {
      type: DataType.INTEGER,
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
  - info <recipe items>
  - instructions
  - origin
-- user id
-- recipe
*/
