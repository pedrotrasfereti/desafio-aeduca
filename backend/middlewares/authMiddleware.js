import jwt from 'jsonwebtoken';

import { FORBIDDEN, UNAUTHORIZED } from '../utils/statusCodes.js';

const authMiddleware = (req, res, next) => {
  const token = String(req.headers['Authorization']).replace('Bearer ', '');

  if (!token) {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: 'Token é obrigatório' });
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData; // Inject decoded user data into the request

    next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .json({ success: false, message: 'Token inválido ou expirado' });
  }
};

export default authMiddleware;
