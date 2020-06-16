module.exports = (error, req, res, next) => {
  if (process.env.NODE_DEV !== "production") {
    console.log(error);
  }

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
