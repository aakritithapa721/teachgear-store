const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, connectDB } = require('./db/database');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL || 'http://localhost:5173' // Use env variable for flexibility
}));

// ✅ Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5555; // Fallback port

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Routes
app.use('/api/test', require('./route/testroute'));
app.use('/api/products', require('./route/productroute'));

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ force: false }); // Safe sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();



