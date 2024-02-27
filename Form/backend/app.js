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