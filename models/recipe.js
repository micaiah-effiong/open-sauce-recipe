module.exports = function (sequelize, DataType) {
  let model = sequelize.define("recipe", {});

  return model;
};

/*
  - name
  - description
  - items <recipe items>
  - instructions
  - origin
-- user id
*/
