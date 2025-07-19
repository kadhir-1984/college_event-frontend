import React, { useState } from 'react';
import './AdminLogin.css';
import { Link } from 'react-router-dom';


const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${formData.username} | Password: ${formData.password}`);
    // Later you’ll connect this to backend
  };

  return (
    <div className="admin-container">
       <div className="back-container">
         <Link to="/" className="back-to-events">← Back to Events</Link>
       </div>


      <h2 className="admin-title">🔐 Admin Login</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="username"
          placeholder="Admin Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
