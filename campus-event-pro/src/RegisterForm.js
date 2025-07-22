import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
  const { id } = useParams(); // Get event ID from the URL

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Registered for Event ID: ${id}\nName: ${formData.name}\nEmail: ${formData.email}`);
    setFormData({ name: '', email: '', department: '' });
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
          placeholder="🏫 Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <button type="submit">✅ Submit Registration</button>
      </form>
    </div>
  );
};

export default RegisterForm;
