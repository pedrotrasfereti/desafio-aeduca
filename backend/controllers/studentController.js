import * as studentService from '../services/studentService.js';
import asyncHandler from '../utils/asyncHandler.js';
import { OK, CREATED } from '../utils/statusCodes.js';

export const getAllStudents = asyncHandler(async (_req, res) => {
  const data = await studentService.getAllStudents();
  res.status(OK).json({ success: true, data });
});

export const createStudent = asyncHandler(async (req, res) => {
  const student = req.body;

  const data = await studentService.createStudent(student);

  res.status(CREATED).json({ success: true, data });
});
