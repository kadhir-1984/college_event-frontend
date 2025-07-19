import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const EventCard = ({ id, title, date, category, description }) => {
  return (
    <Link to={`/event/${id}`} style={{ textDecoration: 'none' }}>
      <div className="event-card">
        <h2 className="event-title">{title}</h2>
        <div className="event-info">
          <span className="date">📆 {formatDate(date)}</span>
          <span className={`category ${category.toLowerCase()}`}>{category}</span>
        </div>
        <p className="event-description">{description}</p>
      </div>
    </Link>
  );
};

export default EventCard;
