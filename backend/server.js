const express = require('express');
const connectDB = require('./config/db'); // connnect to database
const cors = require('cors');
const path = require('path');
const fs = require('fs');   
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const researchRoutes = require('./routes/researchRoutes');
const eventRoutes = require('./routes/eventRoutes');

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes );
app.use('/api/research', researchRoutes);
app.use('/api/events', eventRoutes);

app.use('/upload', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
