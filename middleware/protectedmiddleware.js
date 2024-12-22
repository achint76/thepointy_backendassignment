const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        console.log(req.user,"2424242");
        return res.status(403).json({ message: 'Access denied. Admin only has the rights to make operations related to product.' });
    }
    next();
};

module.exports = isAdmin;