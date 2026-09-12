require('dotenv').config();
console.log('Gemini key loaded:', process.env.GEMINI_API_KEY ? 'YES' : 'NO');

// ... rest of your code
const express = require('express');
const cors = require('cors');
const path = require('path');

// import the /analyze/url router
const analyzeUrlRouter = require('./src/routes/analyzeUrl');

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// serve static files (screenshots) from /public
app.use(express.static('public'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI UX Auditor backend running' });
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: white;">
        <h1>Vantage Pro Backend is Running 🚀</h1>
        <p>This is the API server. To use the application, please visit the frontend:</p>
        <a href="http://localhost:3000" style="color: #22d3ee; font-size: 1.2rem; font-weight: bold; text-decoration: none;">Go to http://localhost:3000</a>
      </body>
    </html>
  `);
});

// Analyze URL routes
// Full path will be: POST /analyze/url
app.use('/analyze', analyzeUrlRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
