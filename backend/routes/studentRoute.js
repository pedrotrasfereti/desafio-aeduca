import express from 'express';

// Controllers
import {
  getAllStudents,
  createStudent,
  updateStudent,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.post('/', createStudent);
router.put('/:ra', updateStudent);

export default router;
