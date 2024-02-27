import express from "express";
import cors from 'cors';
import mysql from 'mysql';
import morgan from 'morgan';
import bodyParser from 'body-parser';


const app = express();
const port = 8001;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin'
})

db.connect((err) => {
    if(err) {
        console.error("unable to connect",err)
    }else{
        console.log('successfully connected')
    }
})

db.query("CREATE DATABASE IF NOT EXISTS sform", (err) => {
    if(err){
        console.error('unable to create database' , err);
    }else{
        console.log('Database created Successfully or already exists');
    }
    db.query("USE sform");

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS signup_form(
        id INT AUTO_INCREMENT PRIMARY KEY,
        fname VARCHAR(255) NOT NULL,
        lname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        mob VARCHAR(25) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        pass VARCHAR(255) NOT NULL
    )`;
    db.query(createTableQuery,(err) => {
        if (err){
            console.error('unable to create the table',err);
        }else{
            console.log('Table has been created successfully')
        }
    })
    app.post('/signup',(req,res) => {
        const {fname ,lname ,email ,mob ,gender ,pass} = req.body;
        const insertQuery = 'INSERT INTO signup_form (fname,lname,email,mob,gender,pass) VALUES (?,?,?,?,?,?)';
        db.query(insertQuery,[fname,lname,email,mob,gender,pass],(err,result) => {
            if(err){
                console.error("Error in inserting the data",err);
                res.status(500).send('internal server error')
            }else{
                console.log('Inserted successfully');
                res.status(200).json({message: "Form Submitted Successfully", data: {fname ,lname ,email ,mob ,gender ,pass}})
            }
        })
    })



    app.get('/api/data',(req,res) => {
        const selectQuery = "SELECT * FROM signup_form";
        db.query(selectQuery,(err,result) => {
            if(err){
                console.error("unable to fetch the data" ,err);
                res.status(500).send("Internal server error",err)
            }else{
                console.log("Data has been fetched successfully");
                res.status(200).json(result)
            }
        })
    })
})



app.listen(port, () => {
    console.log(`Server is running on port number ${port}`)
})