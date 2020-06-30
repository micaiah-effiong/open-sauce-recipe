/*
 * convert request queries to Sequlize queries using Sequelize.Op
 * @param {Object} query is an express requset query object
 * @param {Object} Op is Sequelize Operators
 * return Sequlize queries using Sequelize.Op no operatorAliases
 */
function queryToSequelize(query, Op) {
  let queryStr = JSON.stringify(query);
  let q2 = {};
  Object.keys(query).filter((val) => {
    if (query[val] instanceof Object && !(query[val] instanceof Array)) {
      q2[val] = queryToSequelize(query[val], Op);
      return;
    }
    if (!!val.match(/\b(gt|gte|lt|lte|eq|ne|like)\b/g)) {
      q2[Op[val]] = query[val];
    } else {
      q2[val] = query[val];
    }
  });
  return q2;
}

module.exports = {
  /*
   * @param {String} str
   * return string with first letter as capital
   * convert str to sentence case
   * toSentenceCase("foo") => "Foo"
   */
  toSentenceCase(str) {
    // to Sentence Case function
    return (
      str.toLowerCase().split("")[0].toUpperCase() + str.substr(1).toLowerCase()
    );
  },

  queryToSequelize,
};
