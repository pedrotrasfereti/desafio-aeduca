import express from 'express';

// Controllers
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);

export default router;
