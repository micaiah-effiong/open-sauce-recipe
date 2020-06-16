const bcrypt = require("bcrypt");
const _ = require("underscore");
const errorResponse = require("../handlers/error-response");

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
        validate: {
          len: [8, 100],
        },
        set: function (value) {
          const _salt = bcrypt.genSaltSync(10);
          const _hash = bcrypt.hashSync(value, _salt);
          this.setDataValue("password", value);
          this.setDataValue("salt", _salt);
          this.setDataValue("hash", _hash);
        },
      },
      salt: {
        type: DataType.STRING,
      },
      hash: {
        type: DataType.STRING,
      },
    },
    {
      hooks: {
        beforeValidate: function (model, options) {
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
