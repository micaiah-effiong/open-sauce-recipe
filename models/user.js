module.exports = function (sequelize, DataType) {
  let model = sequelize.define(
    "user",
    {
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
    },
    {
      hooks: {
        beforeValidate: function () {
          // convert email to lower case
          if (user.email) {
            user.email = user.email.toLowerCase().trim();
          }
        },
      },
    }
  );

  // instance methods
  // model.prototype.methodName
  model.prototype.verifyPassword = function (password) {
    // run check to verify password
  };

  model.prototype.getFullName = function () {
    return `${this.firstname} ${this.lastname}`;
  };

  model.prototype.toPublicJSON = function () {
    //
    // ommit some fields
  };

  // class methods
  // model.methodName

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
