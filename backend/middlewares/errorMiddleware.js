import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const errorMiddleware = (err, req, res) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export default errorMiddleware;
