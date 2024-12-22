const jwt = require('jsonwebtoken');



const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Getting the token from the Authorization header while using postman
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifying the token
        console.log(decoded,"CODED");
        req.user = { userId: decoded.id, role: decoded.role }; // Add user data to request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

// const isAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         console.log(req.user,"2424242");
//         return res.status(403).json({ message: 'Access denied. Admin only has the rights to make operations related to product.' });
//     }
//     next();
// };

module.exports = authenticate;
