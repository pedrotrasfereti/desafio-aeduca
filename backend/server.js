import express from 'express';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM students');
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ error: 'Database query error' });
  }
});

app.listen(PORT, () => {
  console.log('Server started at http://localhost:5000');
});
