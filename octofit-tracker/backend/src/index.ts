import express from 'express';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker API listening on port ${PORT}`);
});

export default app;
