const { Op } = require('sequelize');
const Product = require('../model/productmodel');
require('dotenv').config();

const addProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? req.file.path : null;

        if (!name || !price || !description) {
            return res.status(400).json({ success: false, message: "Please fill all required fields" });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            image
        });

        res.status(201).json({ success: true, message: "Product added", product: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const { name, description, price } = req.body;
        const image = req.file ? req.file.path : product.image;

        const updatedProduct = await product.update({ name, description, price, image });

        res.status(200).json({ success: true, message: "Product updated", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await product.destroy();
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

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
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts
};
