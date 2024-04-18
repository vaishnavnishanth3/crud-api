import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from './models/product.model.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database\n"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("In Order Page");
});

app.get('/api/products', async (req, res) => {
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

app.get('/api/product/:id', async(req,res) => {
    try
    {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
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

app.put('/api/product/:id', async(req,res) => {
    try
    {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (!product) {
            return res.status(404).json({message:"Product Not Found"})
        }

        const updatedProduct = await Product.findById(req.params.id);
        res.status(200).json(updatedProduct);
    }   
    catch(error)
    {
        res.status(500).json({messgae: error.message})
    }
})

app.delete('/api/product/:id', async(req,res) => {
    try
    {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({message:"Product Not Found"})
        }
        res.status(200).json({message:"Product deleted successfully!"});
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
});
