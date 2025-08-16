import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch all registrations
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/registrations');
      setRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  // Delete a registration
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/registrations/${id}`);
      setMessage('✅ Registration deleted successfully');
      fetchRegistrations(); // refresh list
    } catch (error) {
      console.error('Error deleting registration:', error);
      setMessage('❌ Failed to delete registration');
    }
  };

  // Load on page start
  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>📊 Admin Dashboard</h2>

      {message && (
        <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Event ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td>{reg.name}</td>
                <td>{reg.email}</td>
                <td>{reg.department}</td>
                <td>{reg.eventId}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(reg._id)} 
                    className="delete-btn"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
