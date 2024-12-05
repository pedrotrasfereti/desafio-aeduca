import pool from '../config/db.js';

export const getUserByLogin = async (login) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE login = ?', [
    login,
  ]);

  if (rows.length === 0) return null;

  return rows[0];
};
