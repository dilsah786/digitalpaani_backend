const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { booksController } = require("./controller/books.route");
const { userController } = require("./controller/user.routes");
const { authentication } = require("./Auth_Middleware/authentication");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/user", userController);

app.get("/", async (req, res) => {
    res.json({message : "Your books api is working fine for more update please read documentaion"});
  });

app.use(authentication);

app.use("/books", booksController);



app.listen(process.env.port || 8080, async () => {
  try {
    await connection;
    console.log("App is connected to mongo");
  } catch (err) {
    console.log(err);
  }
  console.log("App is runnign on port 8080");
});
