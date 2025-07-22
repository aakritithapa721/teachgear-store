// src/model/productmodel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING, // Matches "रू 800" format
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'Products',
  timestamps: true
});


module.exports = Product;