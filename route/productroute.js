/*const express = require("express");
const fileUpload = require("../middleware/multer");
const router = express.Router();

router.post("/add", fileUpload("image"), addProduct);

module.exports = router; */
const express = require('express');
const fileUpload = require('../middleware/multer');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
} = require('../controller/productcontroller');

const router = express.Router();

router.post('/add', fileUpload('image'), addProduct);
router.put('/update/:id', fileUpload('image'), updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/product/:id', getProduct);
router.get('/products', getAllProducts); 

module.exports = router;
