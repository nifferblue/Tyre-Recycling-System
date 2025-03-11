import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from './Payment';

const TireList = () => {
    const [tires, setTires] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [orderAmount, setOrderAmount] = useState(0); // Store the tire price

    useEffect(() => {
        axios.get('http://localhost:5000/api/tires')
            .then(res => setTires(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleOrder = async (tireId, price) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:5000/api/orders/place',
                { tireId },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (res.data && res.data.order) {
                setSelectedOrder(res.data.order._id);
                setOrderAmount(price);  // Store the tire price
                setShowPayment(true);
            } else {
                alert('Order failed. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Order placement failed.');
        }
    };

    return (
        <div>
            <h2>Available Tires</h2>
            {tires.map((tire) => (
                <div key={tire._id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', borderRadius: '8px' }}>
                    <img
                        src={`data:image/jpeg;base64,${tire.image}`}
                        alt={tire.title}
                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
                    />
                    <h3>{tire.title}</h3>
                    <p>{tire.description}</p>
                    <p><strong>Price:</strong> ${tire.price}</p>
                    <p><strong>Seller:</strong> {tire.seller && tire.seller.name ? tire.seller.name : 'Unknown Seller'}</p>
                    <button onClick={() => handleOrder(tire._id, tire.price)}>Order Now</button>
                </div>
            ))}

            {/* Show Payment Component if an order is placed */}
            {showPayment && selectedOrder && (
                <Payment orderId={selectedOrder} amount={orderAmount} />
            )}
        </div>
    );
};

export default TireList;
