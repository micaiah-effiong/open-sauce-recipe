const _ = require("underscore");
const asyncHandler = require("../handlers/async-handler");
const errorResponse = require("../handlers/error-response");

module.exports = (db) => {
  return {
    getSingle: asyncHandler(async (req, res, next) => {
      /*
       * convert req.params.id to Number
       * find the review by Primary Key
       */
      let id = Number(req.params.id);
      let review = await db.review.findByPk(id);

      /*
       * check if review is empty and respond with -Not found 404
       */
      if (!review) {
        return next(errorResponse("Resource not found", 404));
      }

      /*
       * if no error, respond with success=true and date
       */
      res.json({
        success: true,
        data: review.toJSON(),
      });
    }),

    getAll: asyncHandler(async (req, res, next) => {
      /*
       * find all reviews
       * @variable {Array} review
       * convert array values to raw JSON format
       */
      let reviews = await db.review.findAll();
      let data = reviews.map((review) => review.toJSON());

      res.json({
        success: true,
        data,
      });
    }),

    create: asyncHandler(async (req, res, next) => {
      /*
       * get parameters from req.params
       */
      let { type, id } = req.params;

      /*
       * format values
       * {String} type to lower case
       * {String} to number
       */
      type = type.toLowerCase();
      id = Number(id);

      /*
       * get user's reviews
       */
      let ownedReviews = await req.user.getReviews();
      let dup = ownedReviews.filter((rev) => rev.toJSON()[`${type}Id`] === id);

      /*
       * check for an existing review
       */
      if (dup.length >= 1) {
        return next(
          errorResponse("You have already reviewed this recipe", 403)
        );
      }

      /*
       * validate type
       * check if it is a "recipe" or "variation"
       */
      if (type !== "recipe" && type !== "variation") {
        return next(errorResponse("Bad request", 400));
      }

      /*
       * {Object} item <recipe | variation>
       * find the item to be reviwed
       * if not found respond with an error
       */
      let item = await db[type].findByPk(id);
      if (!item) {
        return next(errorResponse("Bad request", 400));
      }

      /*
       * create review from item instance
       * associate review with user
       */
      let body = _.pick(req.body, "words", "rating");
      body.to = type;
      let newReview = await item.createReview(body);
      await req.user.addReview(newReview);

      /*
       * if no error, respond with success=true and date
       */
      res.status(201).json({
        success: true,
        data: newReview,
      });
    }),

    update: asyncHandler(async (req, res, next) => {
      /*
       * convert req.params.id to Number
       * find the review by Primary Key
       * update review with data
       * if no error, respond with success=true and date
       */
      let id = Number(req.params.id);
      let review = await db.review.findByPk(id);

      /*
       * check if review is empty and respond with -Bad request 400
       */
      if (!review) {
        return next(errorResponse("Bad request", 400));
      }

      let data = await review.update(req.body, { returning: true });

      res.json({
        success: true,
        data,
      });
    }),

    deleteSingle: asyncHandler(async (req, res, next) => {
      /*
       * convert req.params.id to Number
       * find the review by Primary Key
       * delete/destroy review
       * if no error, respond with success=true and date
       */
      let id = Number(req.params.id);
      let review = await db.review.findByPk(id);

      /*
       * check if review is empty and respond with -Bad request 400
       */
      if (!review) {
        return next(errorResponse("Bad request", 400));
      }

      let data = await review.destroy({
        where: { id },
      });

      res.json({
        success: true,
        data,
      });
    }),
  };
};
