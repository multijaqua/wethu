const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// SQLite database connection
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Endpoint to handle registration form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Insert user data into SQLite database
    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [username, email, password], function(err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).json({ error: 'Registration failed. Please try again.' });
            return;
        }
        console.log(`A new user has been registered with id ${this.lastID}`);
        res.json({ message: 'Registration successful!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


