// routes/bookRoutes.js
const express = require('express');
const { BooksModel } = require('../Model/booksModel');

const booksController = express.Router();

// Create a new book
booksController.post('/', async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;
        const book = new BooksModel({ title, author, publicationYear });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all books
booksController.get('/', async (req, res) => {
    try {
        const books = await BooksModel.find();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get a single book by ID
booksController.get('/:id', async (req, res) => {
    try {
        const book = await BooksModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update a book by ID
booksController.put('/:id', async (req, res) => {
    try {
        const { title, author, publicationYear } = req.body;
        const updatedBook = await BooksModel.findByIdAndUpdate(req.params.id, { title, author, publicationYear }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a book by ID
booksController.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await BooksModel.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = {booksController};
