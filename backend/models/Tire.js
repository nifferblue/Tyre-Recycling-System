const mongoose = require('mongoose');

const TireSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tire', TireSchema);
