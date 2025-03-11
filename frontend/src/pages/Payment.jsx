import React, { useState } from 'react';
import axios from 'axios';

const Payment = ({ orderId, amount }) => {
    const [phone, setPhone] = useState('');

    const handlePayment = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post('http://localhost:5000/api/mpesa/pay', 
                { phone, amount, orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(res.data.msg);
        } catch (err) {
            alert('Payment Failed!');
        }
    };

    return (
        <div>
            <h2>Make Payment</h2>
            <input type="text" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;
