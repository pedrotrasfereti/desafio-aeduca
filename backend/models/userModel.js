import bcrypt from 'bcrypt';

import pool from '../config/db.js';

export const getUserByLogin = async (login) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE login = ?', [
    login,
  ]);

  if (rows.length === 0) return null;

  return rows[0];
};

export const createUser = async ({ login, password, roleId }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    'INSERT INTO users (login, password, role_id) VALUES (?, ?, ?)',
    [login, hashedPassword, roleId],
  );

  return result.insertId;
};
