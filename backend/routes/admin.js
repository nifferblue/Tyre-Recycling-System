const express = require('express');
const adminAuth = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Order = require('../models/Order');
const Tire = require('../models/Tire');

const router = express.Router();

// Get All Users
router.get('/users', adminAuth, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Ban/Unban a User
router.put('/users/:id', adminAuth, async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.isBanned = !user.isBanned;
    await user.save();
    res.json({ msg: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully` });
});

// Get All Orders
router.get('/orders', adminAuth, async (req, res) => {
    const orders = await Order.find().populate('buyer').populate('tire');
    res.json(orders);
});

// Update Order Status
router.put('/orders/:id', adminAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = req.body.status;
    await order.save();
    res.json({ msg: 'Order updated successfully' });
});

// Get All Tires
router.get('/tires', adminAuth, async (req, res) => {
    const tires = await Tire.find();
    res.json(tires);
});

// Add a New Tire
router.post('/tires', adminAuth, async (req, res) => {
    const { name, description, price, stock, imageUrl } = req.body;
    const tire = new Tire({ name, description, price, stock, imageUrl });
    await tire.save();
    res.json({ msg: 'Tire added successfully' });
});

// Edit Tire
router.put('/tires/:id', adminAuth, async (req, res) => {
    const tire = await Tire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tire) return res.status(404).json({ msg: 'Tire not found' });

    res.json({ msg: 'Tire updated successfully' });
});

// Delete Tire
router.delete('/tires/:id', adminAuth, async (req, res) => {
    const tire = await Tire.findByIdAndDelete(req.params.id);
    if (!tire) return res.status(404).json({ msg: 'Tire not found' });

    res.json({ msg: 'Tire deleted successfully' });
});

module.exports = router;
