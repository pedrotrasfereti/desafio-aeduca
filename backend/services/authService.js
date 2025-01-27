import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as roleModel from '../models/roleModel.js';
import * as userModel from '../models/userModel.js';
import { BAD_REQUEST, UNAUTHORIZED } from '../utils/statusCodes.js';
import ValidationError from '../utils/validationError.js';

export const loginUser = async (login, password) => {
  if (!login || !password) {
    throw new ValidationError('Login e senha são obrigatórios', BAD_REQUEST);
  }

  const user = await userModel.getUserByLogin(login);

  if (!user) {
    throw new ValidationError('Login ou senha inválidos', UNAUTHORIZED);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!user || !passwordMatch) {
    throw new ValidationError('Login ou senha inválidos', UNAUTHORIZED);
  }

  const role = await roleModel.getRoleById(user.role_id);

  const token = jwt.sign(
    { login: user.login, role: role.role }, // Sign payload
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  return { login: user.login, role: role.role, token };
};
