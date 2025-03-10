import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadTire from '../pages/UploadTire'; // Import the UploadTire component
import TireList from '../pages/TireList'; // Import the TireList component

const Dashboard = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h3>Welcome, {role}!</h3>

            {/* Render buttons based on role */}
            {role === 'admin' && <button onClick={() => alert('Manage Users')}>Manage Users</button>}
            {role === 'seller' && (
                <>
                    <UploadTire /> {/* Render the UploadTire component for sellers */}
                    <TireList /> {/* Render the TireList component for sellers */}
                </>
            )}
            {role === 'buyer' && <button onClick={() => alert('View Products')}>View Products</button>}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;