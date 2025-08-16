import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
  const { id } = useParams(); // Event ID from URL

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });

  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        ...formData,
        eventId: id  // Attach event ID
      });

      setMessage(`✅ ${response.data.message}`);
      setFormData({ name: '', email: '', department: '' }); // Reset form
    } catch (error) {
      console.error(error);
      setMessage('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <Link to="/" className="back-link">← Back to Events</Link>
      <h2>📝 Register for Event #{id}</h2>
      
      <form onSubmit={handleSubmit} className="registerform">

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="👤 Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="📧 Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="department">Department</label>
        <input
          id="department"
          type="text"
          name="department"
          placeholder="🏫 Your Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <button type="submit">✅ Submit Registration</button>
      </form>

      {/* Success or Error Message */}
      {message && (
        <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
