// src/model/productmodel.js
module.exports = (Sequelize, sequelize) => {
  const Product = sequelize.define('Product', {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DataTypes.FLOAT, // Fixed from STRING
      allowNull: false,
    },
    image: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    specs: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
    },
    stock: {
      type: Sequelize.DataTypes.INTEGER, // Added stock field
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    tableName: 'Products',
    timestamps: true,
  });
  return Product;
};