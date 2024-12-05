class ValidationError extends Error {
  constructor(message, statusCode = 500) {
    super(message); // Pass message to the base Error constructor
    this.status = statusCode; // Assign status code
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ValidationError;
