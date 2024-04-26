// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    userId:{type:String}
});

const BooksModel = mongoose.model('Book', bookSchema);


module.exports = {BooksModel}