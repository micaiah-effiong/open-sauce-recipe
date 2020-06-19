class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = (msg, statusCode) => {
  return new ErrorResponse(msg, statusCode);
};
