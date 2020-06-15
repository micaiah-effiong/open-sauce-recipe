var express = require("express");
let {
  getSingle,
  getAll,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").recipes;
var router = express.Router();

/* GET recipes listing. */
router.route("/").get(getAll).post(create);

router.route("/:id").get(getSingle).put(update).delete(deleteSingle);

module.exports = router;
