/*const express = require("express");
const fileUpload = require("../middleware/multer");
const router = express.Router();

router.post("/add", fileUpload("image"), addProduct);

module.exports = router; */
const express = require('express');
const fileUpload = require('../middleware/multer');
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts } = require('../controller/productcontroller'); // Import from controller
const router = express.Router();

router.post("/add", fileUpload("image"), addProduct); // Add product route
router.put("/update/:id", fileUpload("image"), updateProduct); // Update product route
router.delete("/delete/:id", deleteProduct); // Delete product route
router.get("/product/:id", getProduct); // Get single product
router.get("/products", getAllProducts); // Get all products

module.exports = router;
