const express = require('express');
const router = express.Router();
const BookModel = require('../models/BookModel'); // Ensure the path is correct


//add books
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publish year',
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await BookModel.create(newBook);

        console.log("Book created:", book); // Add this line for debugging

        return res.status(201).send(book);
    } catch (error) {
        console.error("Error creating book:", error); // Add this line for debugging
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

// GEt books
router.get('/', async (req, res) => {
    try {
        const books = await BookModel.find({});

        return res.status(200).json({

            count: books.length,
            data: books
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// GET a book by ID
router.get('/:id', async (req, res) => {
    try {
        const bookId = req.params.id;
        const bookz = await BookModel.findById(bookId);

        if (!bookz) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(bookz);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
        return res.status(400).send({
            message: 'Send all required fields: title, author, publish year',
        });
    }

    try {
        const updatedBook = await BookModel.findByIdAndUpdate(
            req.params.id,
            { title, author, publishYear },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (
            updatedBook.title === title &&
            updatedBook.author === author &&
            updatedBook.publishYear === publishYear
        ) {
            return res.status(200).json({
                message: 'No changes were made to the book',
                book: updatedBook,
            });
        }

        res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook,
        });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await BookModel.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


module.exports = router;