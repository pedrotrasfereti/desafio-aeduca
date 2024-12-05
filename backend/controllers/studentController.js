import * as studentService from '../services/studentService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { OK, CREATED } from '../utils/statusCodes.js';

export const getAllStudents = asyncHandler(async (_req, res) => {
  const data = await studentService.getAllStudents();
  return res.status(OK).json({ success: true, data });
});

export const createStudent = asyncHandler(async (req, res) => {
  const student = req.body;

  const data = await studentService.createStudent(student);

  return res
    .status(CREATED)
    .json({ success: true, data, message: 'Aluno cadastrado com sucesso.' });
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { ra } = req.params;
  const student = req.body;

  const data = await studentService.updateStudent(ra, student);

  return res
    .status(OK)
    .json({ success: true, data, message: 'Cadastro atualizado com sucesso.' });
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const { ra } = req.params;

  await studentService.deleteStudent(ra);

  return res
    .status(OK)
    .json({ success: true, message: 'Cadastro deletado com sucesso.' });
});
