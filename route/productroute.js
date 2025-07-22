const express = require('express');
const fileUpload = require('../middleware/multer');
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts
} = require('../controller/productcontroller');

const router = express.Router();

// Use 'image' as fieldname (must match frontend)
router.post('/add', fileUpload('image'), addProduct);
router.put('/update/:id', fileUpload('image'), updateProduct);
router.delete('/delete/:id', deleteProduct);

// ✅ Changed from '/product/:id' to '/:id'
router.get('/:id', getProduct);

// ✅ Get all products
router.get('/', getAllProducts);

module.exports = router;

