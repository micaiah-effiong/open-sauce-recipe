var express = require("express");
let {
  getSingle,
  getAll,
  create,
  update,
  deleteSingle,
} = require("../controllers/index").recipes;
let asyncHandler = require("../handlers/async-handler");
let variationsRouter = require("./variations");
var router = express.Router();

router.use("/variations", variationsRouter);

/* GET recipes listing. */
router.route("/").get(asyncHandler(getAll)).post(asyncHandler(create));

router
  .route("/:id")
  .get(asyncHandler(getSingle))
  .put(asyncHandler(update))
  .delete(asyncHandler(deleteSingle));

module.exports = router;
