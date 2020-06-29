const queryToSequelize = require("./queryToSequelize");
module.exports = (reqQuery) => {
  let queryObj = { ...reqQuery };
  ["select", "sort", "page", "limit"].forEach(
    (field) => delete queryObj[field]
  );

  /*
   * filtering fields
   */
  let attributes = [];
  if (reqQuery.select) {
    attributes =
      typeof reqQuery.select == "string"
        ? reqQuery.select.replace(/\,/g, " ").trim().split(" ")
        : [...reqQuery.select];
  }

  /*
   * sorting <ASC|DESC>
   */
  let sort = [];
  if (reqQuery.sort) {
    sort =
      typeof reqQuery.sort == "string"
        ? reqQuery.sort.replace(/\,/g, " ").trim().split(" ")
        : [...reqQuery.sort];

    sort.forEach((item, num) => {
      if (item.startsWith("-")) {
        sort[num] = [item.substring(1), "DESC"];
      } else {
        sort[num] = [item, "ASC"];
      }
    });
  }

  let page = {};
  if (reqQuery.page || reqQuery.limit) {
    page.limit = reqQuery.limit;
    page.offset = reqQuery.page;
    page.offset = (page.offset - 1) * page.limit;
  }

  /*
   * convert express queries to Sequlize queries
   */
  let sequelizeQuery = queryToSequelize(queryObj);

  /*
   * full query object
   */
  let fullQuery = {
    where: sequelizeQuery,
  };

  /*
   * checking query conditions
   * - filtering
   * - sorting
   * - pagination
   */
  if (attributes.length > 0) {
    fullQuery.attributes = attributes;
  }

  if (sort.length > 0) {
    fullQuery.order = sort;
  }

  fullQuery.limit = page.limit;
  fullQuery.offset = page.offset;

  return fullQuery;
};
