import Joi from 'joi';

const studentSchema = Joi.object({
  login: Joi.string().min(3).required().messages({
    'string.base': 'O campo "Login" deve ser uma string',
    'string.empty': 'O campo "Login" não pode ficar vázio',
    'string.length': 'O campo "Login" deve ter no mínimo 3 caracteres',
    'any.required': 'O campo "Login" é obrigatório',
  }),

  password: Joi.string().min(8).required().messages({
    'string.base': 'O campo "Senha" deve ser uma string',
    'string.empty': 'O campo "Senha" não pode ficar vázio',
    'string.min': 'O campo "Senha" deve ter no mínimo 8 caracteres',
    'any.required': 'O campo "Senha" é obrigatório',
  }),

  roleId: Joi.number().valid(0, 1).required().messages({
    'any.only': 'Nível de Permissão inválido',
    'string.base': 'O campo "Nível de Permissão" deve ser um número',
    'string.empty': 'O campo "Nível de Permissão" não pode ficar vázio',
    'any.required': 'O campo "Nível de Permissão" é obrigatório',
  }),
});

export default studentSchema;
