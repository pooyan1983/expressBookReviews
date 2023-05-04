const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  console.log('users: ', users)
  const username = req.query.username;
  const password = req.query.password;
    if (!username) {
        return res.status(404).json({message: "Body Empty"});
    }
    if (users.some(elem => (elem.username==username && elem.password==password))){
        let accessToken = jwt.sign({
            data: username
          }, 'access', { expiresIn: 60 * 60 });
          req.session.authorization = {
            accessToken
        }
        return res.status(300).json({message: "You are logged in"});
    }
    else{
        return res.status(404).json({message: "user not valid"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  isbn = req.params.isbn
  review = req.params.review
  user = req.user.data
  //console.log(req.session.authorization)
  text = `Review for ISBN ${isbn} is added by user: ${user}`;
  console.log(text);

  return res.status(300).json({message: text});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
