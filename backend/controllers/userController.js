import * as userService from '../services/userService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { CREATED } from '../utils/statusCodes.js';

export const createUser = asyncHandler(async (req, res) => {
  const user = req.body;

  const data = await userService.createUser(user);

  return res
    .status(CREATED)
    .json({ success: true, data, message: 'Usuário cadastrado com sucesso.' });
});
