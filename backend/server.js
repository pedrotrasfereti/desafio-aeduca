import path from 'path';

import dotenv from 'dotenv';
import express from 'express';

import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoute.js';
import studentRoutes from './routes/studentRoute.js';
import userRoutes from './routes/userRoute.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // To parse JSON request bodies

app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// Routes
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/users', userRoutes);

// Middlewares
app.use(errorMiddleware);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'frontend/dist' directory
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  // Catch-all route to serve index.html for any route that isn't an API call
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log('Server started at http://localhost:5000');
});
