import getAllStudentsService from '../services/studentService.js';
import asyncHandler from '../utils/asyncHandler.js';

const getAllStudentsController = asyncHandler(async (req, res) => {
  const data = await getAllStudentsService();
  res.status(200).json({ success: true, data });
});

export default getAllStudentsController;
