const express = require('express');
const multer = require('multer');
const Tire = require('../models/Tire');
const { auth, sellerAuth } = require('../middleware/auth');

const router = express.Router();

// Configure Multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: Upload a Tire (Only Sellers)
router.post('/upload', auth, sellerAuth, upload.single('image'), async (req, res) => {
    try {
        // Log the Authorization header
        console.log("Authorization Header:", req.headers.authorization);

        const { title, description, price } = req.body;

        if (!req.file) {
            return res.status(400).json({ msg: 'No image file uploaded' });
        }

        // Convert the uploaded file to a Base64-encoded string
        const imageBase64 = req.file.buffer.toString('base64');

        const newTire = new Tire({
            title,
            description,
            price,
            image: imageBase64, // Save Base64 string in MongoDB
            seller: req.user._id
        });

        await newTire.save();
        res.json({ msg: 'Tire uploaded successfully', tire: newTire });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Route: Fetch all Tires
router.get('/', async (req, res) => {
    try {
        const tires = await Tire.find().populate('seller', 'name email');

         // Filter out tires with missing sellers
         const validTires = tires.filter(tire => tire.seller !== null);

         res.json(validTires);
        // res.json(tires);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;