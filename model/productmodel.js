// src/model/productmodel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/database'); // Path to your database.js

const Product = sequelize.define('Product', { // Changed model name to 'Product' for clarity
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT, // Changed to TEXT for longer descriptions
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING, // Changed to STRING to store "रू 800" format
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // URL or path to image
    allowNull: true,
  }
}, {
  tableName: 'Products', // Explicitly set table name if needed
  timestamps: true // Adds createdAt and updatedAt fields
});

// Sync the model with the database (use with caution in production)
(async () => {
  await Product.sync({ alter: true }); // Use { force: true } only for testing to drop and recreate
  console.log('Product model synced');
})().catch(console.error);

module.exports = Product;