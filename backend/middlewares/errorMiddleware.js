import { INTERNAL_SERVER_ERROR } from '../utils/statusCodes.js';

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, _req, res, _next) => {
  const message = err.message || 'Internal Server Error';

  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    error: err.stack,
  });
};

export default errorMiddleware;
