import * as studentService from '../services/studentService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { OK, CREATED, NO_CONTENT } from '../utils/statusCodes.js';

export const getAllStudents = asyncHandler(async (_req, res) => {
  const data = await studentService.getAllStudents();
  res.status(OK).json({ success: true, data });
});

export const createStudent = asyncHandler(async (req, res) => {
  const student = req.body;

  const data = await studentService.createStudent(student);

  res.status(CREATED).json({ success: true, data });
});

export const updateStudent = asyncHandler(async (req, res) => {
  const { ra } = req.params;
  const student = req.body;

  const data = await studentService.updateStudent(ra, student);

  res.status(OK).json({ success: true, data });
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const { ra } = req.params;

  await studentService.deleteStudent(ra);

  res.status(NO_CONTENT).json({ success: true });
});
