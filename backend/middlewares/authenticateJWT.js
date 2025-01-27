import jwt from 'jsonwebtoken';

import { FORBIDDEN, UNAUTHORIZED } from '../utils/statusCodes.js';

const authenticateJWT = (req, res, next) => {
  const token = String(req.headers['authorization']).replace('Bearer ', '');

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

    // Set the cookie for cross-site requests
    res.cookie('__vercel_live_token', token, {
      httpOnly: true,
      secure: true, // Ensure it's only sent over HTTPS
      sameSite: 'None', // Allow the cookie to be sent in cross-site requests
    });

    // Execute next middleware
    next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .json({ success: false, message: 'Token inválido ou expirado' });
  }
};

export default authenticateJWT;
