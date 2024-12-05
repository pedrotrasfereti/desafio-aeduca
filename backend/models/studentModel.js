import pool from '../config/db.js';

export const getAllStudents = async () => {
  const [rows] = await pool.query('SELECT * FROM students');
  return rows;
};

export const getStudentByRa = async (ra) => {
  const [rows] = await pool.query('SELECT * FROM students WHERE ra = ?', [ra]);

  if (rows.length === 0) return null;

  // Return first result since "RA" is unique
  return rows[0];
};

export const createStudent = async ({ nome, email, ra, cpf }) => {
  const [result] = await pool.query(
    'INSERT INTO students (nome, email, ra, cpf) VALUES (?, ?, ?, ?)',
    [nome, email, ra, cpf],
  );

  return result.insertId;
};

export const updateStudent = async (existingStudent, { nome, email }) => {
  const { ra, cpf } = existingStudent;

  await pool.query('UPDATE students SET nome = ?, email = ? WHERE ra = ?', [
    nome,
    email,
    ra,
  ]);

  // Return updated student
  return {
    ra,
    nome,
    email,
    cpf,
  };
};

export const deleteStudent = async (ra) => {
  return pool.query('DELETE FROM students WHERE ra = ?', [ra]);
};
