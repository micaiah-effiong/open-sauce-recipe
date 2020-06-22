var express = require("express");
let {
  getSingle,
  getAll,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").users;
let isAuth = require("../middlewares/isAuth");
let auth = require("./auth");
var router = express.Router();

router.use("/auth", auth);
router.use(isAuth);

/* GET users listing. */
router.route("/").get(getAll);

router.route("/:id").get(getSingle).put(update).delete(deleteSingle);

module.exports = router;
