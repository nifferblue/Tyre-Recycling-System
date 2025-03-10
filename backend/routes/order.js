const express = require('express');
const Order = require('../models/Order');
const {auth} = require('../middleware/auth');

const router = express.Router();

// Place an order
router.post('/place', auth, async (req, res) => {
    try {
        const { tireId } = req.body;
        const newOrder = new Order({ tire: tireId, buyer: req.user.id });

        await newOrder.save();
        res.json({ msg: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get orders for a user
router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id }).populate('tire');
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
