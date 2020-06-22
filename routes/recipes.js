var express = require("express");
let {
  getSingle,
  getAll,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").recipes;
let isAuth = require("../middlewares/isAuth");
let asyncHandler = require("../handlers/async-handler");
let variationsRouter = require("./variations");
var router = express.Router();

/* GET recipes listing. */
router.use(isAuth);

router.route("/").get(asyncHandler(getAll)).post(asyncHandler(create));

router
  .route("/:id")
  .get(asyncHandler(getSingle))
  .put(asyncHandler(update))
  .delete(asyncHandler(deleteSingle));

router.use("/", variationsRouter);

module.exports = router;
