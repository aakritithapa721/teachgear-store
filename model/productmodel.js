// src/model/productmodel.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'Products',
  timestamps: false
});


module.exports = Product;