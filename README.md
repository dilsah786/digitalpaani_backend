

# DigitalPaani Backend

DigitalPaani Backend is a Node.js application that serves as the backend for the DigitalPaani project. It provides APIs for managing book entries, user authentication, and authorization using JSON Web Tokens (JWT). Password encryption is implemented using bcrypt (bcrypt) for enhanced security.

## Features

- User authentication with JWT
- CRUD operations for managing book entries (Create, Read, Update, Delete)
- Filtering books by author or publication year
- Searching books by search querries
- Pagination  by page and limit

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible via a MongoDB URI

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/dilsah786/digitalpaani_backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd digitalpaani_backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   Or, manually add the following dependencies to your project's `package.json` file:

   ```json
   "dependencies": {
       "bcrypt": "^5.1.1",
       "cors": "^2.8.5",
       "dotenv": "^16.4.5",
       "express": "^4.19.2",
       "jsonwebtoken": "^9.0.2",
       "mongoose": "^8.3.2",
       "nodemon": "^3.1.0"
   }
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=8080
   DB_URI=mongodb://localhost/book_management
   JWT_SECRET=your_secret_key
   ```

### Usage

1. Start the server:

   ```bash
   npm start
   ```

2. Use a tool like Postman or cURL to make HTTP requests to the API endpoints.

### API Endpoints

#### Authentication

- `POST /user/register`: Register a new user. Requires a JSON body with `name`, `email` and `password` fields.
- `POST /user/login`: Log in with existing user credentials. Requires a JSON body with `email` and `password` fields.

#### Book Management

- `POST /books`: Create a new book entry. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `GET /books`: Get all book entries.
- `GET /books/:id`: Get a single book entry by ID.
- `PUT /books/:id`: Update a book entry by ID. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `DELETE /books/:id`: Delete a book entry by ID.

- `Filter url/books?author=Dilnawaz` : Get a list of books with filtering by author
- `Filter By publicationYear url/books?publicationYear=2020` : Get a list of books with Filtering books by publication year.
- `Search url/books?q=query` : Get a list of books by search query
- `Pagination url/books?page=1&limit=10` : Get a list of books by pagination using {page} & {limit} both values are dynamic.



#### Authorization

Protected routes require a valid JWT token obtained through the `/auth/login` endpoint in the `Authorization` header.

### Contributors

- Md Dilnawaz Alam (@dilsah786)

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
