const express = require("express");
const { UserModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = express.Router();

userController.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // If a user is already registered

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status("200").json({ status: "User Already Exist " });
  }
 
  // Otherwise create a new user
  try {
    bcrypt.hash(password, 8, async function (err, hash) {
      // Store hash in your password DB.
      const user = await UserModel.create({ email, password: hash });
      console.log(user);
      res.send(user);
    });
  } catch (err) {
    console.log(err);
  }
});

// loggin in 

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.status("200").json({ status: "User do not exist please register first " });
  }

  const hashed_Pass = user.password;

  try {
    bcrypt.compare(password, hashed_Pass, function (err, result) {
      // result == true
      if (err || !result) {
        return res.status("404").json({ status: "Invalid credential" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.secrettoken);
      res.status(200).json({ status: "Login SuccessFul", token: token });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { userController };
