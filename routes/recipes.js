var express = require("express");
var router = express.Router();

/* GET recipes listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a GET / resource");
});

router.get("/:id", function (req, res, next) {
  res.send("respond with a GET /:id resource");
});

router.post("/", function (req, res, next) {
  res.send("respond with a POST / resource");
});

router.put("/:id", function (req, res, next) {
  res.send("respond with a PUT / resource");
});

router.delete("/:id", function (req, res, next) {
  res.send("respond with a DELETE / resource");
});

module.exports = router;
