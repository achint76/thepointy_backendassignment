const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
const authenticate = require('../middleware/authMiddleware');


router.get('/profile', authenticate, (req, res) => {
    res.status(200).json({ message: 'Welcome to your profile', user: req.user });
});


module.exports = router;