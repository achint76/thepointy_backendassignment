const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Getting the token from the Authorization header while using postman
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token
        console.log(decoded);
        req.user = { userId: decoded.id }; // Add user data to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
