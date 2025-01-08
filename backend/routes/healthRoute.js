import express from 'express';

import pool from '../config/db.js';
import asyncHandler from '../utils/asyncHandler.js';
import { OK } from '../utils/statusCodes.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const connection = await pool.getConnection();

    await connection.ping();
    connection.release();

    return res.status(OK).json({
      success: true,
      message: 'Database is connected',
    });
  }),
);

export default router;
