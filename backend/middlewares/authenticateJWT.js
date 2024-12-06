import jwt from 'jsonwebtoken';

import { FORBIDDEN, UNAUTHORIZED } from '../utils/statusCodes.js';

const authenticateJWT = (req, res, next) => {
  const token = String(req.headers['Authorization']).replace('Bearer ', '');

  // Check token in headers
  if (!token) {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: 'Token é obrigatório' });
  }

  try {
    // Verify JWT token
    const userData = jwt.verify(token, process.env.JWT_SECRET);

    // Inject decoded user data into the request
    req.user = userData;

    // Execute next middleware
    next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .json({ success: false, message: 'Token inválido ou expirado' });
  }
};

export default authenticateJWT;
