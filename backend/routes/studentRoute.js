import express from 'express';

// Controllers
import {
  getAllStudents,
  createStudent,
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudents);
router.post('/', createStudent);

export default router;
