const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const cors = require('cors')
require('dotenv').config();
const router = express.Router();

const app = express()
app.use(cors());   
app.use(express.json());

connectDB();

// AUTH ROUTES
app.use('/api/auth', authRoutes);

// TASK ROUTES
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = router;