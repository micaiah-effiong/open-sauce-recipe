const bcrypt = require("bcrypt");
const _ = require("underscore");

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
        unique: true,
        validate: {
          isEmail: true,
          // validate length
        },
      },
      password: {
        type: DataType.VIRTUAL,
        allowNull: false,
        set: async function (value) {
          try {
            const _salt = await bcrypt.genSalt(10);
            const _hash = await bcrypt.hash(value, _salt);
            this.setDataValue("salt", _salt);
            this.setDataValue("hash", _hash);
            this.setDataValue("password", password);
          } catch (error) {
            return error;
          }
        },
      },
      salt: {
        type: DataType.STRING,
        // validate length
      },
      hash: {
        type: DataType.STRING,
        // validate length
      },
    },
    {
      hooks: {
        beforeValidate: function () {
          // convert email to lower case
          if (model.email) {
            model.email = model.email.toLowerCase().trim();
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
    let data = this.toJSON();
    return _.omit(data, "salt", "hash", "password");
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
