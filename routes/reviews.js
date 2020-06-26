var express = require("express");
let {
  getSingle,
  getAll,
  getByType,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").reviews;
let isAuth = require("../middlewares/isAuth");
var router = express.Router();

router.use(isAuth);

/* GET reviews listing. */
router.route("/").get(getAll);

router.route("/:id").get(getSingle).put(update).delete(deleteSingle);

router.route("/:type/:id").get(getByType).post(create);

module.exports = router;
