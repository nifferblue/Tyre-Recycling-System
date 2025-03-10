import React, { useState } from 'react';
import axios from 'axios';

const UploadTire = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        const token = localStorage.getItem('token');
console.log("Token being sent:", token); // Verify token is retrieved

const headers = { 
    "Authorization": `Bearer ${token}`, 
    "Content-Type": "multipart/form-data"
};
console.log("Headers:", headers); // Check headers structure

await axios.post('http://localhost:5000/api/tires/upload', formData, { headers });

       


        alert('Tire uploaded successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
            <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
            <button type="submit">Upload Tire</button>
        </form>
    );
};

export default UploadTire;
