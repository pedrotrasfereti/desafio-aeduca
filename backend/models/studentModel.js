import pool from '../config/db.js';

const getAllStudents = async () => {
  const [rows] = await pool.query('SELECT * FROM students');
  return rows;
};

export default getAllStudents;
