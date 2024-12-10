import dotenv from 'dotenv';
import mysql from 'mysql2/promise.js';

dotenv.config(); // Load environment variables

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // Protect server with SSL
  ssl: {
    rejectUnauthorized: true,
    ca: '/etc/ssl/certs/ca-certificates.crt',
  },
  // Ensure persistent connection
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  queueLimit: 0,
  connectTimeout: 30000,
  idleTimeout: 60000,
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  }

  console.log('Connected to the database.');
  connection.release();
});

export default pool;
