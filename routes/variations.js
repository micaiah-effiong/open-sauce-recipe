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
router.route("/:rid/variations/").get(getAll).post(create);

router
  .route("/:rid/variations/:id")
  .get(getSingle)
  .put(update)
  .delete(deleteSingle);

module.exports = router;
