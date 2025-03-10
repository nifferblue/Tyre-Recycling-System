const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    tire: { type: mongoose.Schema.Types.ObjectId, ref: 'Tire' },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
