// src/model/productmodel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/database'); // Assuming database.js contains your Sequelize instance

const Product = sequelize.define('Productmodel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// Exporting the Product model to be used elsewhere
module.exports = Product;
