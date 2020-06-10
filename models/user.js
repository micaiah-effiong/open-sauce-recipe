module.exports = function (sequelize, DataType) {
  let model = sequelize.define("user", {});

  return model;
};

/*
  - firstname
  - lastname
  - country
  - email
  - password <virtual>
  - salt
  - hash
*/
