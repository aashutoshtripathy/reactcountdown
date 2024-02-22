import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemon from 'nodemon';



// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const app = express();
const port = 8000;


app.use(cors());
app.use(express.json())

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
    
    // Create database if not exists
    db.query('CREATE DATABASE IF NOT EXISTS form', (err) => {
      if (err) {
        console.error('Error creating database:', err);
      } else {
        console.log('Database created or already exists');
        // Switch to the created database
        db.query('USE form');
        
        // Create table if not exists
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS formData (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `;
        db.query(createTableQuery, (err) => {
          if (err) {
            console.error('Error creating table:', err);
          } else {
            console.log('Table created or already exists');
          }
        });
      }
    });
  }
});

// Middleware to parse incoming form data
// app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/create', (req, res) => {
  const { email, password } = req.body;

  // Insert data into MySQL
  const insertDataQuery = 'INSERT INTO formData (email, password) VALUES (?, ?)';
  db.query(insertDataQuery, [email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data inserted successfully:', result);
      res.status(200).send('Form submitted successfully');
    }
  });
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
