import express from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5000, () => {
  console.log('Server started at http://localhost:5000');
});
