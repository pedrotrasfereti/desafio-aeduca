import pool from '../config/db.js';

export const getRoleById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [id]);

  if (rows.length === 0) return null;

  return rows[0];
};
