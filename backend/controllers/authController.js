import * as authService from '../services/authService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { OK } from '../utils/statusCodes.js';

export const login = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const userData = await authService.loginUser(login, password);

  res.status(OK).json({
    success: true,
    data: userData,
  });
});
