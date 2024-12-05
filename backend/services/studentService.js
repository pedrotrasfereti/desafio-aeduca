import * as studentModel from '../models/studentModel.js';
import studentSchema from '../utils/joi/studentSchema.js';
import { BAD_REQUEST } from '../utils/statusCodes.js';
import ValidationError from '../utils/validationError.js';

export const getAllStudents = async () => {
  const students = await studentModel.getAllStudents();
  return students;
};

export const createStudent = async (student) => {
  const { error } = studentSchema.validate(student, {
    abortEarly: false,
  });

  if (error) {
    const message = error.details.map((detail) => detail.message).join('; ');
    throw new ValidationError(message, BAD_REQUEST);
  }

  const data = await studentModel.createStudent(student);
  return data;
};
