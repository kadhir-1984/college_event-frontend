import React, { useState } from 'react';
import './Home.css';
import EventCard from './components/EventCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const allEvents = [
    {
      id: 1,
      title: "Tech Talk 2025",
      date: "2025-07-05",
      category: "Tech",
      description: "A talk by top developers about AI trends."
    },
    {
      id: 2,
      title: "Cricket League",
      date: "2025-07-10",
      category: "Sports",
      description: "Inter-department cricket tournament."
    },
    {
      id: 3,
      title: "UI/UX Workshop",
      date: "2025-07-15",
      category: "Workshop",
      description: "Hands-on session on modern UI tools."
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Tech", "Sports", "Workshop"];

  const filteredEvents = selectedCategory === "All"
    ? allEvents
    : allEvents.filter(event => event.category === selectedCategory);

  return (
    <div className="home-wrapper">
      <div className="top-bar">
        <Link to="/admin" className="admin-login-btn">🔐 Admin Login</Link>
      </div>

      <div className="container">
        <h1 className="heading">📅 Upcoming Events</h1>
        <p className="subheading">Don’t miss out on the latest events at your college!</p>

        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredEvents.map(event => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            category={event.category}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
