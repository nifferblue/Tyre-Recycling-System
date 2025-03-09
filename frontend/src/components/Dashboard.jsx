import React from 'react';
import { useNavigate } from 'react-router-dom';

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

            {role === 'admin' && <button onClick={() => alert('Manage Users')}>Manage Users</button>}
            {role === 'seller' && <button onClick={() => alert('List Products')}>List Products</button>}
            {role === 'buyer' && <button onClick={() => alert('View Products')}>View Products</button>}

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
