// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, _req, res, _next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: err.stack,
  });
};

export default errorMiddleware;