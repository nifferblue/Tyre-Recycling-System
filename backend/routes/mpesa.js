const express = require('express');
const { stkPush } = require('../config/mpesa');
const {auth} = require('../middleware/auth');
const Order = require('../models/Order');

const router = express.Router();

// Initiate Mpesa Payment
router.post('/pay', auth, async (req, res) => {
    const { phone, amount, orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        const paymentResponse = await stkPush(phone, amount, orderId);

        if (paymentResponse.success) {
            order.status = 'Pending Payment';
            await order.save();
            res.json({ msg: 'STK Push sent, confirm payment on your phone' });
        } else {
            res.status(400).json({ msg: 'Payment failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Mpesa Callback URL
router.post('/callback', async (req, res) => {
    const { Body } = req.body;

    if (Body.stkCallback.ResultCode === 0) {
        const orderId = Body.stkCallback.CallbackMetadata.Item.find(i => i.Name === 'AccountReference').Value.split('_')[1];

        const order = await Order.findById(orderId);
        if (order) {
            order.status = 'Completed';
            await order.save();
        }
    }

    res.status(200).send();
});

module.exports = router;


//consumer key
//AZaQmVoBT23i60vMmR99CjThiLK0NNgVvdlMJpbUoMbpmsPU

//consumer secret
//Ydmff2iWuOW1KUuCY3MXPgxNwnczColD0CqvvADaDc9S6uT4QlDpfBNGFX6IKhmP