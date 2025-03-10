const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');

    console.log("Raw Authorization Header:", authHeader); // Debug log

    if (!authHeader) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    // Extract token by removing "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'Access denied. Invalid token format.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debug log
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification error:", error.message);
        res.status(401).json({ msg: 'Invalid token' });
    }
};

// Middleware to check admin role
const adminAuth = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }
    next();
};

// Middleware to check seller role
const sellerAuth = (req, res, next) => {
    if (!req.user || req.user.role !== 'seller') {
        return res.status(403).json({ msg: 'Access denied. Sellers only.' });
    }
    next();
};

// Middleware to check buyer role
const buyerAuth = (req, res, next) => {
    if (!req.user || req.user.role !== 'buyer') {
        return res.status(403).json({ msg: 'Access denied. Buyers only.' });
    }
    next();
};

module.exports = { auth, adminAuth, sellerAuth, buyerAuth };
