import * as userModel from '../models/userModel.js';
import userSchema from '../utils/joi/userSchema.js';
import { BAD_REQUEST } from '../utils/statusCodes.js';
import ValidationError from '../utils/validationError.js';

export const createUser = async (user) => {
  const { error } = userSchema.validate(user, {
    abortEarly: false,
  });

  if (error) {
    const message = error.details.map((detail) => detail.message).join('; ');
    throw new ValidationError(message, BAD_REQUEST);
  }

  // Check if user exists before creating
  const existingUser = await userModel.getUserByLogin(user.login);

  if (existingUser) {
    throw new ValidationError(
      'Já existe um usuário com login informado.',
      BAD_REQUEST,
    );
  }

  const data = await userModel.createUser(user);
  return data;
};
