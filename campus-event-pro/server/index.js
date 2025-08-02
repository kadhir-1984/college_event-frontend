const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// ✅ Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/campus-events')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Mongoose Schema for Registration
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  eventId: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

// 🗂️ Temporary in-memory "database" of events
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

// ✅ Register route (POST) — Save to MongoDB
app.post('/register', async (req, res) => {
  const { name, email, department, eventId } = req.body;
  try {
    const newRegistration = new Registration({ name, email, department, eventId });
    await newRegistration.save();
    console.log('✅ New Registration Saved:', { name, email, department, eventId });
    res.status(201).json({ message: 'Registration saved to MongoDB' });
  } catch (error) {
    console.error('❌ Error saving registration:', error);
    res.status(500).json({ error: 'Failed to save registration' });
  }
});

// ✅ Get all events
app.get('/events', (req, res) => {
  res.json(events);
});

// ✅ Get single event by ID
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
