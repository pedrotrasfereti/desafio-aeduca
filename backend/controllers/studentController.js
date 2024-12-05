import getAllStudentsService from '../services/studentService.js';

const getAllStudentsController = async (req, res, next) => {
  try {
    const data = await getAllStudentsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default getAllStudentsController;
