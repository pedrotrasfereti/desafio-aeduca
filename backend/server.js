import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import pool from './config/db.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM students');
    res.json(results);
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Serve static files from the 'frontend/dist' directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Catch-all route to serve index.html for any route that isn't an API call
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server started at http://localhost:5000');
});
