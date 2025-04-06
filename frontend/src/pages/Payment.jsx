import React, { useState } from 'react';
import axios from 'axios';

const Payment = ({ orderId, amount, onClose }) => {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!phone.match(/^\d{10}$/)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post(
                'http://localhost:5000/api/mpesa/pay',
                { phone, amount, orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(res.data.msg);
            onClose(); // Close the modal after successful payment
        } catch (err) {
            alert('Payment Failed! Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-xl w-96 z-50 border border-gray-300">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Make Payment</h2>

            {/* Phone Number Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-1">Phone Number</label>
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                />
            </div>

            {/* Amount Display */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-1">Amount</label>
                <input
                    type="text"
                    value={`Ksh ${amount}`}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
            </div>

            {/* Payment Button */}
            <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg text-white transition duration-300 ${
                    loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="mt-2 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
            >
                Cancel
            </button>
        </div>
    );
};

export default Payment;
