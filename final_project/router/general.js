const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  username = req.query.username
  password = req.query.password
  //console.log("username:", req)
  
  if (users.some(elem => (elem.username==username && elem.password==password))){
      message = "user already exists"
  }
  else{
      users.push({"username":username, "password":password})
      message = "user is successfully added"
  }
  return res.status(300).json({message: message});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  book_records = books;
  return res.status(300).json({message: book_records});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  isbn = req.params.isbn
  
  return res.status(300).json({message: books[isbn]});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  author = req.params.author
  isbns = Object.keys(books)
  var book = "";
  
  for (isbn in isbns){
      console.log(isbns[isbn])
      if (books[isbns[isbn]]["author"] == author){
          book = books[isbns[isbn]];
      }
  } 
  
  
  return res.status(300).json({message: book});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  title = req.params.title
  isbns = Object.keys(books)
  var book = "";
  
  for (isbn in isbns){
      if (books[isbns[isbn]]["title"] == title){
          book = books[isbns[isbn]];
      }
  } 
  
  
  return res.status(300).json({message: book});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  isbn = req.params.isbn
  book = books[isbn]
  return res.status(300).json({message: book['review']});
});

module.exports.general = public_users;
