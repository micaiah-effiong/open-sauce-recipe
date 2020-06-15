class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);
  }
}

module.exports = (msg, statusCode) => {
  return new ErrorResponse(msg, statusCode);
};
