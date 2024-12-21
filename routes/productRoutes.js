const express = require('express');
const ProductController = require('../controller/productController');
const authenticate = require('../middleware/authMiddleware'); // Protect these routes

const router = express.Router();

// Product routes i have crated here
router.post('/add-products', authenticate, ProductController.createProduct); 
router.put('/update-products/:id', authenticate, ProductController.updateProduct); 
router.get('/listing-products', ProductController.getAllProducts);
router.put('/delete-products/:id', authenticate, ProductController.deleteProduct);//i have used put method here asit is a good practice in projects which also well aligns with soft deletion but delete will also work


module.exports = router;
