import React, { useState } from 'react';
import axios from 'axios';

const UploadTire = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the logged-in seller's ID from localStorage
        const sellerId = localStorage.getItem('userId');
        if (!sellerId) {
            alert('You must be logged in as a seller to upload a tire.');
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('seller', sellerId); // Include the seller's ID

        // Get the token from localStorage
        const token = localStorage.getItem('token');
        console.log("Token being sent:", token); // Verify token is retrieved

        // Set headers
        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        };
        console.log("Headers:", headers); // Check headers structure

        try {
            // Make the API request
            await axios.post('http://localhost:5000/api/tires/upload', formData, { headers });
            alert('Tire uploaded successfully!');

            // Clear form after successful upload
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);
        } catch (error) {
            console.error('Error uploading tire:', error);
            alert('Failed to upload tire. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Upload a Tire</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">Title</label>
                        <input
                            type="text"
                            placeholder="Enter tire title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">Description</label>
                        <textarea
                            placeholder="Enter tire description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows="4"
                            required
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">Price</label>
                        <input
                            type="number"
                            placeholder="Enter tire price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-1">Upload Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                    >
                        Upload Tire
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadTire;