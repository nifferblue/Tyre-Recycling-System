import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from './Payment';

const TireList = () => {
    const [tires, setTires] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [orderAmount, setOrderAmount] = useState(0);

    const role = localStorage.getItem('role'); // User role (admin, seller, buyer)
    const userId = localStorage.getItem('userId'); // Logged-in seller's ID

    useEffect(() => {
        axios.get('http://localhost:5000/api/tires', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => {
            let filteredTires = res.data;
            console.log("Fetched tires:", res.data);
            console.log("User ID:", userId);
            console.log("Tire sellers:", res.data.map(tire => tire.seller?._id));

            // Ensure sellers only see their own tires
            if (role === 'seller') {
                filteredTires = res.data.filter(tire => {
                    const sellerId = tire.seller?._id ? tire.seller._id.toString() : null;
                    console.log("Comparing:", sellerId, "with", userId);
                    return sellerId === userId;
                });
            }

            setTires(filteredTires);
        })
        .catch(err => console.log(err));
    }, [role, userId]);

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
                setOrderAmount(price);
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
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-900 mb-6"></h2>

            {/* Three-column grid layout for narrower cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tires.length === 0 ? (
                    <p className="text-gray-700">No tires available.</p>
                ) : (
                    tires.map((tire) => (
                        <div
                            key={tire._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Tire Image */}
                            <img
                                src={`data:image/jpeg;base64,${tire.image}`}
                                alt={tire.title}
                                className="w-full h-56 object-cover" // Adjusted height for better visibility
                            />

                            {/* Tire Details */}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tire.title}</h3>
                                <p className="text-gray-600 mb-4">{tire.description}</p>
                                <p className="text-gray-700 font-medium mb-2">Price: ksh.{tire.price}</p>
                                <p className="text-gray-600">Seller: {tire.seller?.name || 'Unknown Seller'}</p>

                                {/* Order Button (only for buyers) */}
                                {role !== 'seller' && tire.seller?._id !== userId && (
                                    <button
                                        onClick={() => handleOrder(tire._id, tire.price)}
                                        className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
                                    >
                                        Order Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Show Payment Component if an order is placed */}
            {showPayment && selectedOrder && (
                <Payment orderId={selectedOrder} amount={orderAmount} />
            )}
        </div>
    );
};

export default TireList;