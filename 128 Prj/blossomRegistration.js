const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 8080; // Choose an appropriate port number

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'blossom_care'
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Middleware to parse JSON data
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Register route
app.post('/register', (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  // Insert user information into the MySQL database
  const sql = 'INSERT INTO users_info (firstname, lastname, username, email_id, password, dateof_reg) VALUES (?, ?, ?, ?, ?, CURDATE())';
  const values = [firstname, lastname, username, email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while registering the user' });
      return;
    }
    console.log('User registered successfully');
    res.json({ message: 'Registered successfully' });
  });
});

app.use(express.static('public'));
