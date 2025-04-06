import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadTire from '../pages/UploadTire';
import TireList from '../pages/TireList';
import AdminDashboard from '../pages/AdminDashboard';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Guest'); // State to store the user's name

    // Get role and userId directly from localStorage
    const role = localStorage.getItem('role') || '';
    const userId = localStorage.getItem('userId') || '';

    useEffect(() => {
        // Fetch the user's name from the backend
        const fetchUserName = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data && res.data.name) {
                    setName(res.data.name); // Set the user's name
                }
            } catch (error) {
                console.error("Error fetching user's name:", error);
            }
        };

        if (userId) {
            fetchUserName();
        }
    }, [userId]);

    const handleLogout = () => {  
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId'); // Ensure userId is also removed
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-green-50 p-6">
            {/* Navigation Bar */}
            <nav className=" bg-green-600 p-4 rounded-lg mb-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">TireCycle</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-white">Welcome, {name}!</span>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-green-800 px-4 py-2 rounded-lg hover:bg-green-100 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="container mx-auto">
                {/* Admin Options */}
                {role === 'admin' && <AdminDashboard />}

                {/* Seller Options */}
                {role === 'seller' && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Seller Dashboard</h2>
                        <UploadTire />
                    </div>
                )}

                {/* Buyer Options */}
                {role === 'buyer' && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-bold text-green-800 mb-4">Buyer Dashboard</h2>
                        <button
                            onClick={() => alert('View Products')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            View Products
                        </button>
                    </div>
                )}

                {/* Display Tires for Both Sellers and Buyers */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Available Tires</h2>
                    <TireList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;