// // server/index.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// app.post('/register', (req, res) => {
//   const { name, email, department } = req.body;
//   console.log('New Registration:', { name, email, department });
//   res.status(200).json({ message: 'Registration saved successfully' });
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);

// });
// app.get('/', (req, res) => {
//   res.send('🎉 Backend server is running!');
// });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// 🗂️ Temporary "database" of events
let events = [
  {
    id: "1",
    title: "Coding Marathon",
    date: "2025-08-01",
    location: "Auditorium A",
    description: "A 24-hour coding event with fun challenges."
  },
  {
    id: "2",
    title: "Robotics Expo",
    date: "2025-08-10",
    location: "Lab Block",
    description: "Exhibition of student-made robots and tech."
  }
];

// ✅ Home route to check server
app.get('/', (req, res) => {
  res.send('🎉 Backend server is running!');
});

// ✅ Register route (POST)
app.post('/register', (req, res) => {
  const { name, email, department, eventId } = req.body;
  console.log('New Registration:', { name, email, department, eventId });
  res.status(200).json({ message: 'Registration saved successfully' });
});

// ✅ Get all events (GET)
app.get('/events', (req, res) => {
  res.json(events);
});

// ✅ Get single event by ID (GET)
app.get('/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
