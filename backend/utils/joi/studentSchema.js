import { cpf } from 'cpf-cnpj-validator';
import Joi from 'joi';

const validateCPF = (str) => cpf.isValid(str);

const studentSchema = Joi.object({
  nome: Joi.string().min(3).required().messages({
    'string.base': 'O campo "Nome" deve ser uma string',
    'string.empty': 'O campo "Nome" não pode ficar vázio',
    'string.length': 'O campo "Nome" deve ter no mínimo 3 letras',
    'any.required': 'O campo "Nome" é obrigatório',
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'O campo "Email" deve ser uma string',
    'string.empty': 'O campo "Email" não pode ficar vázio',
    'string.email': 'Email inválido',
    'any.required': 'O campo "Email" é obrigatório',
  }),

  ra: Joi.string().length(8).required().messages({
    'string.base': 'O campo "RA" deve ser uma string',
    'string.empty': 'O campo "RA" não pode ficar vázio',
    'string.length': 'O campo "RA" deve ter 8 digitos',
    'any.required': 'O campo "RA" é obrigatório',
  }),

  cpf: Joi.string().custom((value, helper) => {
    if (!validateCPF(value)) {
      return helper.message('CPF inválido');
    }
    return value;
  }),
});

export default studentSchema;
