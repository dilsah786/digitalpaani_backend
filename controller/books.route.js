// routes/bookRoutes.js
const express = require("express");
const { BooksModel } = require("../Model/booksModel");

const booksController = express.Router();

// Create a new book
booksController.post("/", async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;
    const book = new BooksModel({ title, author, publicationYear });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all books
booksController.get("/", async (req, res) => {
  let { sortBy, order, page, limit, publicationYear, author, title, q } = req.query;
  const skipDataForPagination = (page - 1) * limit;
  const searchQuerry = q;

  publicationYear = publicationYear*1



  let books = [];
  try {
    books = await BooksModel.find();

    // Get books with search queries
    if (searchQuerry) { 
      const regex = new RegExp(searchQuerry, "i");
      books = await BooksModel.find({
        $or: [
          { title: regex },
          { author: regex },
        ],
      });
      return res.json({ status: "Here is your Book", Book_Details: books });
    }

    // Get all books according to pagination
    if (page && limit) {
          books = await BooksModel.find()
            .skip(skipDataForPagination)
            .limit(limit)
          return res.json({ status: "Total books Pagination", books: books });
    }

     // Filter books by author
    if(author){
        books = await BooksModel.find({author:author})
       
        if(books.length < 0){
            return res.json({message:`No book found with author name: ${author}`})
        }else{
            return res.json({message:`Here is all books found with author name : ${author}`, books : books }); 
        }
    }

    // Filter books by publication Year
    if(publicationYear ){
        books = await BooksModel.find({publicationYear:publicationYear})

        console.log(books.length);

        if(books.length === 0){
            return res.json({message:`No book found with publication Year : ${publicationYear}`})
        }
            return res.json({message:`Here is all books found with publication Year : ${publicationYear}`, books : books }); 
        
    }

    // Get all the books if no above search match 
    return res.json(books);


//    Return Error if there is some issues with the server
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a single book by ID
booksController.get("/:id", async (req, res) => {
  try {
    const book = await BooksModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a book by ID
booksController.patch("/:id", async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;
    const id = req.params.id;

    const updatedBook = await BooksModel.findByIdAndUpdate(
      id,
      { title, author, publicationYear },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ status: "Book updated successfully", updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a book by ID
booksController.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await BooksModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { booksController };
