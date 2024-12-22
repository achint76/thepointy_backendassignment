const express = require('express');
const ProductController = require('../controller/productController');
const authenticate = require('../middleware/authMiddleware'); // 
const isAdmin = require('../middleware/authMiddleware'); 
const router = express.Router();

// Product routes i have crated here
router.post('/add-products', authenticate, isAdmin, ProductController.createProduct);   //only admin can make operations relateed to product it is not the users job
router.put('/update-products/:id', authenticate, isAdmin, ProductController.updateProduct); 
router.get('/listing-products', ProductController.getAllProducts);
router.put('/delete-products/:id', authenticate, isAdmin, ProductController.deleteProduct);//i have used put method here asit is a good practice in projects which also well aligns with soft deletion but delete will also work


module.exports = router;
