const { Op } = require('sequelize');
const Product = require('../model/productmodel');
require('dotenv').config();

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : null;

    // Validation
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    // Create product
    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Add Product Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : product.image;

    const updatedProduct = await product.update({
      name: name || product.name,
      description: description || product.description,
      price: price || product.price,
      image,
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Update Product Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await product.destroy();
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete Product Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get Single Product
const getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Get Product Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Get All Products (with optional filters)
const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { [Op.like]: `%${search}%` };
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.findAll({ where: query });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Get All Products Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
