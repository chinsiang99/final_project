const express = require('express');
let books = Object.values(require("./booksdb.js"));
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;

  if(!username || !password){
    return res.status(400).json({
      message: "username or password must not be empty"
    })
  }

  const user = users.find(user => {
    return user.username === username
  })

  if(user){
    return res.status(400).json({
      message: "username exists, please use another username"
    })
  }

  users.push({
    username,
    password
  })

  return res.status(201).json({message: "User is registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(
    {
      "books": books
    }
  );
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if(isbn > books.length){
    return res.status(400).json({
      message: "Invalid isbn value"
    })
  }

  return res.status(200).json({bookDetails: books[+isbn - 1]});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const author = req.params.author;

  const filtered = books.filter(book => {
    return book.author === author
  })

  return res.status(200).json({booksFiltered: filtered});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;

  const filtered = books.filter(book => {
    return book.title === title
  })

  return res.status(200).json({booksFiltered: filtered});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if(isbn > books.length){
    return res.status(400).json({
      message: "Invalid isbn value"
    })
  }

  const filtered = books[+isbn -1]
  return res.status(200).json({bookReview: filtered.reviews});
});

module.exports.general = public_users;
