const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');
const app = express();
require('dotenv').config(); 
const bookRoutes = require('./routes/books');

const PORT = process.env.PORT || 3000

//MiddleWare 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console({
          format:winston.format.combine(
              winston.format.colorize({all:true})
          )
      }

      ),
      new winston.transports.File({ filename: 'error.log' ,level:'error'})
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: 'exceptions.log' })
    ]
  });   

// Routes
app.use('/api/books',bookRoutes);

// Connect To MongoDb Atlas
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    logger.log("info","Connected To MongoDb Atlas")
}).catch(error => {
    logger.log("error", error.message)
})

app.listen(PORT, () => {
    logger.log("info",`Server Started At PORT ${PORT}`);
})