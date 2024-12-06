import express from 'express';

// Controllers
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);

export default router;
