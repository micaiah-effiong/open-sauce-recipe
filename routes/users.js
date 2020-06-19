var express = require("express");
let {
  getSingle,
  getAll,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").users;
let auth = require("./auth");
var router = express.Router();

router.use("/auth", auth);

/* GET users listing. */
router.route("/").get(getAll).post(create);

router.route("/:id").get(getSingle).put(update).delete(deleteSingle);

module.exports = router;
