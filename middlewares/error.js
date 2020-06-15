module.exports = (error, req, res, next) => {
  if (error.name == "SequelizeDatabaseError") {
    error.statusCode = 400;
    error.message = "Invalid input";
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.name,
    msg: error.message,
  });
};
