const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

// Middleware to check admin role
const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
};

// Middleware to check seller role
const sellerAuth = (req, res, next) => {
    if (req.user.role !== 'seller') {
        return res.status(403).json({ msg: 'Access denied. Sellers only.' });
    }
    next();
};

// Middleware to check buyer role
const buyerAuth = (req, res, next) => {
    if (req.user.role !== 'buyer') {
        return res.status(403).json({ msg: 'Access denied. Buyers only.' });
    }
    next();
};

module.exports = { auth, adminAuth, sellerAuth, buyerAuth };
