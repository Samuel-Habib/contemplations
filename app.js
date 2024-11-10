// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const thoughtRoutes = require('./routes/thoughtRoutes');
const ideaRoutes = require('./routes/ideaRoutes');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(logger); // Custom logger middleware

// Routes
app.use(thoughtRoutes);
app.use(ideaRoutes);

// Connect to MongoDB and start the server
connectDB();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
