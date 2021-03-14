const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config(); 
const bookRoutes = require('./routes/books');

const PORT = process.env.PORT || 3000

//MiddleWare 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books',bookRoutes);

// Connect To MongoDb Atlas
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    console.log("Connected To MongoDb Atlas")
}).catch(error => {
    console.log("Something Went Wrong", error)
})

app.listen(PORT, () => {
    console.log("Server Started At PORT", PORT);
})