let db = require("../models/index");

let usersController = require("./users");
let recipesController = require("./recipes");
let variationsController = require("./variations");
let reviewsController = require("./reviews");

module.exports = ((db) => {
  return {
    users: usersController(db),
    recipes: recipesController(db),
    variations: variationsController(db),
    reviews: reviewsController(db),
  };
})(db);
