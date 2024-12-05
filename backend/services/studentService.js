import getAllStudents from '../models/studentModel.js';

const getAllStudentsService = async () => {
  const students = await getAllStudents();
  return students;
};

export default getAllStudentsService;
