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
        beforeValidate: function (user, options) {
          // convert email to lower case and trim
          if (user.email) {
            user.email = user.email.toLowerCase().trim();
          }
        },
        beforeCreate: async function (user, options) {
          /*
           * Before creating user generate salt and hash password
           */
          try {
            const { password } = user;
            const _salt = await bcrypt.genSalt(10);
            const _hash = await bcrypt.hash(password, _salt);
            user.setDataValue("password", password);
            user.setDataValue("salt", _salt);
            user.setDataValue("hash", _hash);
          } catch (error) {
            return error;
          }
        },
      },
    }
  );

  // instance methods
  // model.prototype.methodName
  model.prototype.verifyPassword = async function (password) {
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
