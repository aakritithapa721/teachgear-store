const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// Load and initialize the Product model
const Product = require('../model/productmodel')(Sequelize, sequelize);

// Connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Sync models with database and alter tables if necessary (adds missing columns like 'specs')
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database and models synced successfully.");
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

  
module.exports = { sequelize, connectDB, Product };
