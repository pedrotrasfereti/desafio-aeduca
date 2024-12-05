import express from 'express';

// Controllers
import getAllStudentsController from '../controllers/studentController';

const router = express.Router();

router.get('/', getAllStudentsController);

export default router;
