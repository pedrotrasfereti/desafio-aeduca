import pool from '../config/db.js';

const getAllStudents = async () => {
  const [rows] = await pool.query('SELECT * FROM non_existent_table');
  return rows;
};

export default getAllStudents;
