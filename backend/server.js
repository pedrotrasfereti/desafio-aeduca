import path from 'path';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {
  authenticateJWT,
  authorizeAdmin,
  errorMiddleware,
} from './middlewares/index.js';
import {
  authRoutes,
  healthRoute,
  studentRoutes,
  userRoutes,
} from './routes/index.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // To parse JSON request bodies

app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Add CORS
app.use(
  cors({
    origin: 'https://desafio-aeduca.vercel.app',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders:
      'Content-Type, Authorization, Cache-Control, Expires, Pragma',
    credentials: true, // Allow cookies with cross-origin requests
  }),
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoute);
app.use('/api/students', authenticateJWT, authorizeAdmin, studentRoutes);
app.use('/api/users', userRoutes);

// Middlewares
app.use(errorMiddleware);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'frontend/dist' directory
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  // Catch-all route to serve index.html for any route that isn't an API call
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
