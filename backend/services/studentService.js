import getAllStudents from '../models/studentModel';

const getAllStudentsService = async () => {
  const students = await getAllStudents();
  return students;
};

export default getAllStudentsService;
