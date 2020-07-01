const bcrypt = require("bcrypt");
const _ = require("underscore");
const jwt = require("jsonwebtoken");
const errorResponse = require("../handlers/error-response");

module.exports = function (sequelize, DataType) {
  let model = sequelize.define(
    "user",
    {
      firstname: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      lastname: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          len: [3, 100],
        },
      },
      gender: {
        type: DataType.ENUM,
        allowNull: false,
        values: ["M", "F"],
      },
      country: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          len: [2],
        },
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
      role: {
        type: DataType.ENUM,
        values: ["user", "admin"],
        defaultValue: "user",
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

  /*
   * verify user password
   * @param {String} password the user password
   * @return {Boolean} true if password matches hash
   */
  model.prototype.verifyPassword = async function (password) {
    // run check to verify password
    let result = await !!bcrypt.compare(password, this.hash);
    return result;
  };

  /*
   * get user's fullname
   * @return {String} with user's firstname and lastname
   */
  model.prototype.getFullName = function () {
    return `${this.firstname} ${this.lastname}`;
  };

  model.prototype.getResetPasswordToken = async function () {
    return Promise(function (resolve, reject) {
      let email = this.email;
      let payload = {
        email,
      };
      jwt.sign(
        payload,
        process.env.FORGOTTEN_PASSWORD_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  };

  /*
   * convert user data to a non sensitive data
   * @return {String}
   * omit user data like salt, hast(, and password which is not stored)
   */
  model.prototype.toPublicJSON = function () {
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
