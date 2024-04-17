import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from './models/product.model.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

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
  
app.get('api/products', async (req, res) => {
    try
    {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error)
    {
        res.status(500).json({message: error.message})
    }
})

app.post('/api/products', async (req, res) => {
    try
    {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }
    catch(error)
    {
        res.status(500).json({message: error.message});
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
});