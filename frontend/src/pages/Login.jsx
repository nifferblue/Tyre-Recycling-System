import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            // Store token and role in localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.user.role);

            alert('Login Successful');

            // Redirect based on role
            if (res.data.user.role === 'admin') {
                navigate('/admin-dashboard');
            } else if (res.data.user.role === 'seller') {
                navigate('/seller-dashboard');
            } else {
                navigate('/buyer-dashboard');
            }

        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
