import express from 'express';

// Controllers
import getAllStudentsController from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getAllStudentsController);

export default router;
