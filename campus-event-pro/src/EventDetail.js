import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './EventDetail.css'; 

const mockEvents = [
  {
    id: 1,
    title: "Tech Talk 2025",
    date: "2025-07-05",
    category: "Tech",
    description: "A talk by top developers about AI trends.",
    location: "Auditorium A",
    speakers: ["John Doe", "Jane Smith"]
  },
  {
    id: 2,
    title: "Cricket League",
    date: "2025-07-10",
    category: "Sports",
    description: "Inter-department cricket tournament.",
    location: "College Ground",
    speakers: []
  },
  {
    id: 3,
    title: "UI/UX Workshop",
    date: "2025-07-15",
    category: "Workshop",
    description: "Hands-on session on modern UI tools.",
    location: "Lab 3",
    speakers: ["Alice Johnson"]
  }
];

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const EventDetail = () => {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="event-detail-container">
        <p>❌ Event not found.</p>
        <Link to="/">← Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="event-detail-container">
      <Link to="/" className="back-link">← Back to Events</Link>
      <div className="event-detail-card">
        <h1>{event.title}</h1>
        <p className="event-meta">📆 {formatDate(event.date)} | 📍 {event.location} | 🏷 {event.category}</p>
        <p className="event-description">{event.description}</p>
        {event.speakers.length > 0 && (
          <>
            <h3>🎤 Speakers</h3>
            <ul>
              {event.speakers.map((speaker, index) => (
                <li key={index}>{speaker}</li>
              ))}
            </ul>
          </>
        )}
      <Link to={`/register/${event.id}`} className="register-link"> 📝 Register Now</Link>
      </div>
    </div>
  );
};

export default EventDetail;
