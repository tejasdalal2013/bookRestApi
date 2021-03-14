const express = require('express');
const router = express.Router();
const { Book, validateBook } = require('../models/books')

// Post Routes 
router.post('/', async (req, res) => {
    const error = await validateBook(req.body);
    if (error.message) res.status(400).send(error.message)
    book = new Book({
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge
        },
        genre: req.body.genre
    });

    book.save().then(book => {
        res.send(book);
    }).catch(error => {
        res.status(500).send("Books Not Stored In Db")
    })
})

// Get All Books In API
router.get("/", (req, res) => {
    Book.find().then(books => res.send(books)).catch(error => {
        res.status(500).send("Something Went Wrongs")
    })
})
// Get The Book By Id
router.get("/:bookId", async (req, res) => {
    const book = await Book.findById(req.params.bookId);
    if (!book) res.status(404).send("Book Not Found")
    res.send(book)
})

// Update The Book

router.put("/:bookId", async (req, res) => {
    const updateBook = await Book.findByIdAndUpdate(req.params.bookId, {
        name: req.body.bookName,
        author: {
            name: req.body.authorName,
            age: req.body.authorAge,
        },
        genre: req.body.genre,
    },
        { new: true }
    );
    if (!updateBook) res.status(404).send("Book Not Found");
    res.send(updateBook)
})

// Delete The Book On Id
router.delete('/:bookId', async(req,res) =>{
    const book = await Book.findByIdAndRemove(req.params.bookId)
if(!book) res.status(404).send("Books With Id Not Found")
res.send(book)
})




module.exports = router