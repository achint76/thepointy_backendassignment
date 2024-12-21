const express = require('express');
const OrderController = require('../controller/orderController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/creating-order', authenticate, OrderController.createOrder);

// listing all orders for the logged-in user
router.get('/listing-order', authenticate, OrderController.getOrders);

// Update
router.put('/update-order/:id', authenticate, OrderController.updateOrderStatus);

// Soft delete of orderws i m using put here as a method
router.put('/delete-order/:id', authenticate, OrderController.deleteOrder);

module.exports = router;
