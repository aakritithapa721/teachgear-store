const express = require('express');
const router = express.Router();
const { placeOrder, getOrders } = require('../controller/orderController');
const auth = require('../middleware/authguard');

router.post('/', auth, placeOrder);
router.get('/', auth, getOrders);

module.exports = router;