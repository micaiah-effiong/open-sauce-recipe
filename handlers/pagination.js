let db = require("../models/index");
const qureyHandler = require("./advanceQuery");

/*
 * @param {Object} qurey is a request object
 * returns a pagination object
 * eg GET /reviews?id[gt]=5&select=id,words&page=2&limit=3
 *
 * pagination: {
 *   prev: {
 *     page: 1,
 *     limit: 3,
 *   },
 * },
 */

module.exports = async function (query) {
  /*
   * setup response pagination
   */
  let pagination = {};
  let { page, limit } = query;
  limit = Number(limit);
  page = Number(page);
  let offset = (page - 1) * limit;

  /*
   * delete pagination page and limit
   * in order to get the actual length of data response
   * which is based on the users request
   */
  ["page", "limit"].forEach((val) => delete query[val]);
  let total = await db.review
    .findAll(qureyHandler(query))
    .then((result) => result.length);

  /*
   * create pagination data for next and previous pages
   */
  if (offset > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  if (limit * page < total) {
    pagination.next = { page: page + 1, limit };
  }

  return pagination;
};
