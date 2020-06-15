module.exports = (db) => {
  return {
    getSingle: (req, res, next) => {
      res.send("respond with a GET /:id resource");
    },
    getAll: (req, res, next) => {
      res.send("respond with a GET / resource");
    },
    create: (req, res, next) => {
      res.send("respond with a POST / resource");
    },
    update: (req, res, next) => {
      res.send("respond with a PUT /:id resource");
    },
    deleteSingle: (req, res, next) => {
      res.send("respond with a DELETE /:id resource");
    },
  };
};
