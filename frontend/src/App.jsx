import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'
import Dashboard from './components/Dashboard'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/seller-dashboard" element={<Dashboard />} />
                <Route path="/buyer-dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
