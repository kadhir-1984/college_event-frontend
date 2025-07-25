// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { name, email, department } = req.body;
  console.log('New Registration:', { name, email, department });
  res.status(200).json({ message: 'Registration saved successfully' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);

});
app.get('/', (req, res) => {
  res.send('🎉 Backend server is running!');
});