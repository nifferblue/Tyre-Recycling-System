import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tires, setTires] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            await fetchUsers();
            await fetchOrders();
            await fetchTires();
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/users', { headers: authHeader() });
            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/orders', { headers: authHeader() });
            setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchTires = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/tires', { headers: authHeader() });
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

    const authHeader = () => ({
        Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-3xl font-bold text-green-900 mb-6">Admin Dashboard</h1>

            {loading && (
                <div className="flex justify-center items-center">
                    <p className="text-green-700">Loading...</p>
                </div>
            )}

            {/* Manage Users Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">Manage Users</h2>
                {users.length > 0 ? (
                    users.map(user => (
                        <div key={user._id} className="flex justify-between items-center p-4 border-b border-green-100">
                            <div>
                                <p className="text-green-900 font-medium">{user.name}</p>
                                <p className="text-green-600">{user.email}</p>
                            </div>
                            <button
                                onClick={() => toggleUserBan(user._id)}
                                className={`px-4 py-2 rounded ${
                                    user.isBanned ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                } text-white transition duration-300`}
                            >
                                {user.isBanned ? 'Unban' : 'Ban'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-green-700">No users available</p>
                )}
            </div>

            {/* Manage Orders Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">Manage Orders</h2>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order._id} className="flex justify-between items-center p-4 border-b border-green-100">
                            <div>
                                <p className="text-green-900 font-medium">{order.user?.name} ordered {order.tire?.name}</p>
                                <p className="text-green-600">Status: {order.status}</p>
                            </div>
                            <button
                                onClick={() => updateOrderStatus(order._id, 'Completed')}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition duration-300"
                            >
                                Mark as Completed
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-green-700">No orders available</p>
                )}
            </div>

            {/* Manage Tires Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">Manage Tires</h2>
                {tires.length > 0 ? (
                    tires.map(tire => (
                        <div key={tire._id} className="flex justify-between items-center p-4 border-b border-green-100">
                            <div>
                                <p className="text-green-900 font-medium">{tire.name}</p>
                                <p className="text-green-600">${tire.price}</p>
                            </div>
                            <button
                                onClick={() => deleteTire(tire._id)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-green-700">No tires available</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;