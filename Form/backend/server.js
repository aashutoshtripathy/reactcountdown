import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
// import nodemon from 'nodemon';

// const express = require('express');
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const app = express();
const port = 8000;


app.use(morgan("dev"));


app.use(cors());
app.use(express.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  // multipleStatements: true,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Unable to connect to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");

    // Create database if not exists
    db.query("CREATE DATABASE IF NOT EXISTS form", (err) => {
      if (err) {
        console.error("Error creating database:", err);
      } else {
        console.log("Database created or already exists");
        // Switch to the created database
        db.query("USE form");

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
            console.error("Error creating table:", err);
          } else {
            console.log("Table created or already exists");
          }
        });
      }
    });
  }
});

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post("/create", (req, res) => {
  console.log("Received a /create POST request");

  const { email, password } = req.body;

  // Insert data into MySQL
  const insertDataQuery =
    "INSERT INTO formData (email, password) VALUES (?, ?)";
  db.query(insertDataQuery, [email, password], (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted successfully:", result);
      // res.status(200).send("Form submitted successfully");
      res.status(200).json({message:'form submitted successfullt', data: {email,password}})
    }
  });
});




// const createSignupTableQuery = `
//       CREATE TABLE IF NOT EXISTS signupdata(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         first name VARCHAR(255) NOT NULL,
//         last name VARCHAR(255) NOT NULL,
//         e-mail VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         confirm password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )`;



db.query("USE form");


const createSignupTableQuery = `
  CREATE TABLE IF NOT EXISTS signupdata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    confirm_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;





db.query(createSignupTableQuery, (err) => {
  if (err) {
    console.error("error in creating signup table:", err);
  } else {
    console.log("SignUp table has been created or already exists");
  }
});
app.post("/signup", (req, res) => {
  const { fname, lname, email, pass, cpass } = req.body;

  const insertSignupQuery =
    "INSERT INTO signupdata (first_name,last_name,email,password,confirm_password) VALUES (?,?,?,?,?)";
  db.query(
    insertSignupQuery,
    [fname, lname, email, pass, cpass],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into Mysql :", err);
        res.status(500).send("Internal server error");
      } else {
        console.log("Data inserted successfully", result);
        // res.status(200).send("Form submitted successfully.");
        res.status(200).json({ message: "Form submitted successfully", data: { fname, lname, email, pass, cpass} });

      }
    }
  );
});



app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM formData"; 
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});


app.delete("/api/data/:id",(req,res) => {
  const id = req.params.id;

  const deleteQuery = "DELETE FROM formData WHERE id = ?"
  db.query(deleteQuery,[id],(err,result) => {
    if (err) {
      console.error(`Error with deleting the ID ${id}`,err);
      res.status(500).json({error:"Internal Server Error"});
    } else {
      res.json({message:`Data with ID ${id} has been successfully deleted`})
    }
  })
})



app.get("/api/data/:id",(req,res) => {
  const id = req.params.id;


  const selectQuery = "SELECT * from formData WHERE id = ?"
  db.query(selectQuery,[id],(err,result) => {
    if (err) {
      console.error(`Error with fetching this id ${id}`,err);
      res.status(500).json({message:"Error with dealing this ID "})
    } else {
      res.json({message:`Data with this ID ${id} has been fetched successfully`})
    }
  })
})



// app.put("/api/data/:id",(req ,res) => {
//   const id = req.params.id;
//   const {email,password} = req.body;
//   const updateQuery = "UPDATE formData SET email = ?,password = ? WHERE id = ?";
//   db.query(updateQuery,[email,password,id], (err,result) => {
//     if (err) {
//       console.error(`Error while updating the data with ID ${id}`,err);
//       res.status(500).json({message:"Internal Server Error"});
//     } else {
//       res.json({message:`Data with ID ${id} is updated successfully`})
//     }
//   })
// })






app.put("/api/data/:id", (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;
  const updateQuery = "UPDATE formData SET email = ?, password = ? WHERE id = ?";

  db.query(updateQuery, [email, password, id], (err, result) => {
    if (err) {
      console.error(`Error while updating the data with ID ${id}`, err);
      res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    } else {
      if (result.affectedRows > 0) {
        res.json({ success: true, message: `Data with ID ${id} is updated successfully` });
      } else {
        res.status(404).json({ success: false, message: `Data with ID ${id} not found` });
      }
    }
  });
});




app.post("/signup",(req,res) => {
  const {fname,lname,email} = req.body;
  db.query({fname,lname,email},(err,result) => {
    
  })
  if(error){
    console.error('error encountered');
    res.status(500).send("Internal error");
  }else{
    console.log('success...');
    res.status(200).json({message: "success", data: {data}});
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
