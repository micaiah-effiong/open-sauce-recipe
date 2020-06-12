module.exports = function (sequelize, DataType) {
  let model = sequelize.define("user", {
    firstname: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },
    lastname: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },
    country: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        // validate length
      },
    },
    password: {
      type: DataType.VIRTUAL,
    },
    salt: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },
    hash: {
      type: DataType.STRING,
      allowNull: false,
      // validate length
    },

    // instance methods
    // model.prototype.methodName

    // class methods
    // model.methodName
  });
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
