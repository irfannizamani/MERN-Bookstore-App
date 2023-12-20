const express = require('express');
const mongoose = require('mongoose');
const BookRoutes = require('./routes/BookRoutes');
const cors = require ("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5555; // Default to 3000 if PORT is not defined
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("MERN STACK");
});

app.use('/books', BookRoutes);

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`App connected to the db`);
    app.listen(PORT, () => {
        console.log(`App is running on port: ${PORT}`);
    });
}).catch((error) => {
    console.log("Failed to connect to the db", error);
});
