import { FORBIDDEN } from '../utils/statusCodes.js';

const authorizeAdmin = (req, res, next) => {
  const userRole = req.user.role; // Info previously injected by authenticate middleware

  if (userRole !== 'admin') {
    return res
      .status(FORBIDDEN)
      .json({ success: false, message: 'Permissões insuficientes' });
  }

  next();
};

export default authorizeAdmin;
