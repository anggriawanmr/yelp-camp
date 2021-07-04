class ExpressError extends error {
  constructor(message, statusCode) {
    super();
    this.massage = message;
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
