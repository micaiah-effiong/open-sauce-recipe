var express = require("express");
var router = express.Router();

let usersRouter = require("./users");
let recipesRouter = require("./recipes");
let variationsRouter = require("./variations");
let reviewsRouter = require("./reviews");

/* use routes*/
router.use("/users", usersRouter);
router.use("/recipes", recipesRouter);
router.use("/reviews", reviewsRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", function (req, res, next) {
  res.send("ci with travis");
});

module.exports = router;
