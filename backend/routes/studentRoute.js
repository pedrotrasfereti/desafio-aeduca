import express from 'express';

// Controllers
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.post('/', createStudent);
router.put('/:ra', updateStudent);
router.delete('/:ra', deleteStudent);

export default router;
