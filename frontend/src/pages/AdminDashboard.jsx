import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tires, setTires] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchOrders();
        fetchTires();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/users', { headers: authHeader() });
            console.log("API Users Response:", res.data);
            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/orders', { headers: authHeader() });
            console.log("API Orders Response:", res.data);
            setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchTires = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/tires', { headers: authHeader() });
            console.log("API Tires Response:", res.data);
            setTires(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching tires:", error);
        }
    };

    const toggleUserBan = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${id}`, {}, { headers: authHeader() });
            fetchUsers();
        } catch (error) {
            console.error("Error toggling user ban:", error);
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/orders/${id}`, { status }, { headers: authHeader() });
            fetchOrders();
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const deleteTire = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/tires/${id}`, { headers: authHeader() });
            fetchTires();
        } catch (error) {
            console.error("Error deleting tire:", error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h2>Manage Users</h2>
            {users.length > 0 ? (
                users.map(user => (
                    <div key={user._id}>
                        {user.name} - {user.email}
                        <button onClick={() => toggleUserBan(user._id)}>
                            {user.isBanned ? 'Unban' : 'Ban'}
                        </button>
                    </div>
                ))
            ) : (
                <p>No users available</p>
            )}

            <h2>Manage Orders</h2>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id}>
                        {order.user?.name} ordered {order.tire?.name} - {order.status}
                        <button onClick={() => updateOrderStatus(order._id, 'Completed')}>
                            Mark as Completed
                        </button>
                    </div>
                ))
            ) : (
                <p>No orders available</p>
            )}

            <h2>Manage Tires</h2>
            {tires.length > 0 ? (
                tires.map(tire => (
                    <div key={tire._id}>
                        {tire.name} - ${tire.price}
                        <button onClick={() => deleteTire(tire._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No tires available</p>
            )}
        </div>
    );
};

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`
});

export default AdminDashboard;
