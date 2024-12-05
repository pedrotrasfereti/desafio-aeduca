import pool from '../config/db.js';

export const getAllStudents = async () => {
  const [rows] = await pool.query('SELECT * FROM students');
  return rows;
};

export const createStudent = async ({ nome, email, ra, cpf }) => {
  const [result] = await pool.query(
    'INSERT INTO students (nome, email, ra, cpf) VALUES (?, ?, ?, ?)',
    [nome, email, ra, cpf],
  );

  return result.insertId;
};
