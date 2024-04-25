# digitalpaani_backend


Certainly! Here's a template for a README.md file that provides detailed documentation for the book management API:

---

# Book Management API

This is a simple book management API built using Node.js and Express.js. It allows users to perform CRUD operations on book entries and provides user authentication using JWT (JSON Web Tokens).

## Features

- User authentication with JWT
- CRUD operations for managing book entries (Create, Read, Update, Delete)
- Filtering books by author or publication year

## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible via a MongoDB URI

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your_username/book-management-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd book-management-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=3000
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

- `POST /auth/register`: Register a new user. Requires a JSON body with `username` and `password` fields.
- `POST /auth/login`: Log in with existing user credentials. Requires a JSON body with `username` and `password` fields.

#### Book Management

- `POST /books`: Create a new book entry. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `GET /books`: Get all book entries.
- `GET /books/:id`: Get a single book entry by ID.
- `PUT /books/:id`: Update a book entry by ID. Requires a JSON body with `title`, `author`, and `publicationYear` fields.
- `DELETE /books/:id`: Delete a book entry by ID.

#### Authorization

Protected routes require a valid JWT token obtained through the `/auth/login` endpoint in the `Authorization` header.

### Contributors

- Md Dilnawaz Alam (@dilsah786)


### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

