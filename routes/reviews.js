var express = require("express");
let {
  getSingle,
  getAll,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").reviews;
var router = express.Router();

/* GET reviews listing. */
router.route("/").get(getAll).post(create);

router.route("/:id").get(getSingle).put(update).delete(deleteSingle);

module.exports = router;
