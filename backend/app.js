const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Navinda1234@',
  database: 'jware'
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected');
  }
});

// Signup API Endpoint
app.post('/signup', (req, res) => {
  const { fullName, email, password } = req.body;

  const query = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
  db.query(query, [fullName, email, password], (err, result) => {
    if (err) {
      console.error('Database insert error:', err);
      res.status(500).json({ error: 'Error signing up' });
    } else {
      console.log('User signed up:', result);
      res.status(201).json({ message: 'User signed up successfully' });
    }
  });
});

// Login API Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        res.status(500).json({ error: 'Login error' });
      } else {
        if (result.length === 1) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
