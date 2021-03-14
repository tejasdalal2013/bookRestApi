const express = require('express');
const router = express.Router();
const Book = require('../models/books')

// Post Routes 
router.post('/',(req,res) =>{
    book = new Book({
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    });

    book.save().then(book =>{
        res.send(book);
    }).catch(error =>{
        res.send(500).send("Books Not Stored In Db")
    })

})
module.exports = router