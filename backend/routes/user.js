const express = require('express');
const { auth, authorizeRole } = require('../middleware/auth');
const router = express.Router();

// ✅ Protected Route (Only Admins)
router.get('/admin', auth, authorizeRole(['admin']), (req, res) => {
    res.json({ msg: 'Welcome Admin! You can manage users.' });
});

// ✅ Protected Route (Only Sellers)
router.get('/seller', auth, authorizeRole(['seller']), (req, res) => {
    res.json({ msg: 'Welcome Seller! You can list products.' });
});

// ✅ Protected Route (Only Buyers)
router.get('/buyer', auth, authorizeRole(['buyer']), (req, res) => {
    res.json({ msg: 'Welcome Buyer! You can purchase products.' });
});

// ✅ Admin Can Change User Roles
router.put('/update-role/:id', auth, authorizeRole(['admin']), async (req, res) => {
    const { role } = req.body;

    if (!['seller', 'buyer', 'admin'].includes(role)) {
        return res.status(400).json({ msg: 'Invalid role' });
    }

    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.role = role;
        await user.save();

        res.json({ msg: `User role updated to ${role}`, user });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
