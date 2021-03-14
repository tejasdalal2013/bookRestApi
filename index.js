const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000

// Connect To MongoDb Atlas
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    console.log("Connected To MongoDb Atlas")
}).catch(error =>{
    console.log("Something Went Wrong",error)
})

app.listen(PORT, () => {
    console.log("Server Started At PORT", PORT);
})