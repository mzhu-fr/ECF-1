import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authentification from './routes/user-auth.js';
import userCRUD from './routes/user-CRUD.js';
import carsCRUD from './routes/cars-CRUD.js';
import employeeCRUD from './routes/employee-CRUD.js';
import reviewsCRUD from './routes/reviews-CRUD.js'
import { config } from 'dotenv';

config();

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    };
    console.log('database connected');
});

export function CreateBackend(port) {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    app.get('/cors', (req, res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.send({ "msg": "This has CORS enabled 🎈" });
    });

    app.use("/auth", authentification);
    app.use("/users", userCRUD);
    app.use("/cars", carsCRUD);
    app.use("/employee", employeeCRUD);
    app.use("/reviews", reviewsCRUD)

    app.listen(port, () => {
        console.log("backend is listening at port : " + port)
    });
}