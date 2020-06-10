module.exports = function (sequelize, DataType) {
  let model = sequelize.define("review", {});

  return model;
};

/*
  - words
  - rating
-- recipe || variation id
-- user id

*/
