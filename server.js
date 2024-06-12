const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ss9056&@',
    database: 'azayditc_database'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    console.log('Request body:', req.body);

    if (!name || !email || !phone || !message) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, message], (err, result) => {
        if (err) {
            console.error(`Error inserting data: ${err.message}`);
            return res.status(500).send('An error occurred, please try again later');
        }

        console.log('Insert result:', result);

        console.log(`Received contact form submission from ${name} (${email})`);
        res.redirect('/contact.html');
    });
});





// Handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send('Name, email, and message are required');
    }
    const sql = 'INSERT INTO contact (name, email, phone, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, message], (err, result) => {
        if (err) throw err;
        console.log(`Received message from ${name} (${email})`);
        res.redirect('/contact.html');
    });
});

app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});

app.use(express.static('public'));
