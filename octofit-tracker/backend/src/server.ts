import express from 'express';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'OctoFit Tracker API is running', apiBaseUrl });
});

app.get('/api/users', (req, res) => {
  res.json({ data: [] });
});

app.get('/api/activities', (req, res) => {
  res.json({ data: [] });
});

// Start server
app.listen(PORT, () => {
  console.log(`OctoFit Tracker API listening on port ${PORT}`);
  console.log(`Base URL: ${apiBaseUrl}`);
});

export default app;
