module.exports = function (sequelize, DataType) {
  let model = sequelize.define("variation", {});

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
