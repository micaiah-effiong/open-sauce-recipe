"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
let logger = require("morgan");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  config.logging = logger;
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

// users association
db.user.hasMany(db.recipe);
db.user.hasMany(db.review);
db.user.hasMany(db.variation);
/*child*/
db.recipe.belongsTo(db.user);
db.review.belongsTo(db.user);
db.variation.belongsTo(db.user);

// recipes association
db.recipe.hasMany(db.variation);
db.recipe.hasMany(db.review);
/*child*/
db.variation.belongsTo(db.recipe);
db.review.belongsTo(db.recipe);

// variations association
db.variation.hasMany(db.review);
/*child*/
db.review.belongsTo(db.variation);

module.exports = db;
