import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TireList = () => {
    const [tires, setTires] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tires')
            .then(res => setTires(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Available Tires</h2>
            {tires.map(tire => (
                <div key={tire._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
                    <img
                        src={`data:image/jpeg;base64,${tire.image}`} // Display Base64 image
                        alt={tire.title}
                        style={{ width: '100px' }}
                    />
                    <h3>{tire.title}</h3>
                    <p>{tire.description}</p>
                    <p><strong>Price:</strong> ${tire.price}</p>
                    <p><strong>Seller:</strong> {tire.seller.name}</p>
                    <button>Order Now</button>
                </div>
            ))}
        </div>
    );
};

export default TireList;