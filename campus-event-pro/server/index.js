const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./db'); 
const PORT = 5000;

// ✅ Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

connectDB();

// ✅ Mongoose Schema for Registration
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  eventId: String,
} , { timestamps: true });

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
    res.status(201).json({ message: 'registration saved successfully' });
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


// Get all registrations (Admin only)
// Fetch all registrations
app.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// Delete registration
app.delete('/registrations/:id', async (req, res) => {
  await Registration.findByIdAndDelete(req.params.id);
  res.json({ message: 'Registration deleted' });
});


// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});