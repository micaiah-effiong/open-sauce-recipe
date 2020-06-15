var express = require("express");
let {
  getSingle,
  getAll,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").variations;
var router = express.Router();

/* GET variations listing. */
router.route("/").get(getAll).post(create);

router.route("/:id").get(getSingle).put(update).delete(deleteSingle);

module.exports = router;
