
import express from 'express';
import { recommendHandler } from './api/recommend.js';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API route for menu recommendations
app.post('/api/recommend', recommendHandler);

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
