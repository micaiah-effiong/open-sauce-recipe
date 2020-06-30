const { Op } = require("sequelize");
/*
 * convert request queries to Sequelize queries using Sequelize.Op
 * @param {Object} query is an express requset query object
 * @param {Object} Op is Sequelize Operators
 * return Sequelize queries using Sequelize.Op no operatorAliases
 */
module.exports = function queryToSequelize(query) {
  let queryStr = JSON.stringify(query);
  let q2 = {};
  Object.keys(query).filter((val) => {
    if (query[val] instanceof Object && !(query[val] instanceof Array)) {
      q2[val] = queryToSequelize(query[val]);
      return;
    }
    if (!!val.match(/\b(gt|gte|lt|lte|eq|ne|like)\b/g)) {
      q2[Op[val]] = query[val];
    } else {
      q2[val] = query[val];
    }
  });
  return q2;
};
