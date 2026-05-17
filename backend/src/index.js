const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Captain Cool AI Backend API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
