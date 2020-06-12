module.exports = function (sequelize, DataType) {
  let model = sequelize.define("review", {
    words: {
      type: DataType.STRING,
      allowNull: true,
    },
    rating: {
      type: DataType.INTEGER,
      allowNull: false,
    },
  });

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
