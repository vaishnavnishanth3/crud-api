import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = 3001;

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database\n"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send();
});

app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
});