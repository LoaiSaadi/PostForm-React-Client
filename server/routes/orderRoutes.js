// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { fetchOrders, createOrder, removeOrder, modifyOrder } = require('../controllers/orderController');

// Use the /orders route
router.get('/', fetchOrders); // This will handle GET requests to /orders
router.post('/insert', createOrder);
router.delete('/delete/:id', removeOrder);
router.put('/update/:id', modifyOrder);

module.exports = router;
