const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authenticate = require('../middleware/authMiddleware');
router.post('/register', authController.register);
router.post('/login', authController.login);



router.get('/profile', authenticate, (req, res) => {
    res.status(200).json({ message: 'Welcome to your profile', user: req.user });
});


module.exports = router;