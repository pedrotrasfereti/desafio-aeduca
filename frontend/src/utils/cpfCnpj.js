import { cpf } from 'cpf-cnpj-validator';

export const removeCpfMask = (str) => {
  return str.replace(/[.-]/g, '');
};

export const validateCPF = (str) => {
  // Remove mask
  str = removeCpfMask(str);

  cpf.isValid(str);
};

export const formatCPF = (str) => {
  return cpf.format(str);
};
