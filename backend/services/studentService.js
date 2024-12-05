import * as studentModel from '../models/studentModel.js';
import studentSchema from '../utils/joi/studentSchema.js';
import { BAD_REQUEST, NOT_FOUND } from '../utils/statusCodes.js';
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

export const updateStudent = async (ra, student) => {
  const existingStudent = await studentModel.getStudentByRa(ra);

  if (!existingStudent) {
    throw new ValidationError(
      'Aluno com o RA informado não existe.',
      NOT_FOUND,
    );
  }

  const updatedStudent = await studentModel.updateStudent(
    existingStudent,
    student,
  );

  return updatedStudent;
};

export const deleteStudent = async (ra) => {
  const existingStudent = await studentModel.getStudentByRa(ra);

  if (!existingStudent) {
    throw new ValidationError(
      'Aluno com o RA informado não existe.',
      NOT_FOUND,
    );
  }

  return studentModel.deleteStudent(ra);
};
