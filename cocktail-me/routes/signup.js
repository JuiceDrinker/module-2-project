const express = require('express');
const signupRouter  = express.Router();

const User = require("./../models/User");

//Create a user
signupRouter.post("/", (req, res, next) => {
  const { username, email, password, repeatedPassword, terms, news } = req.body;

  console.log(req.body);

  if (username === "" || password === "" || email === ""){
    res.render("auth/signup", {messageError: "The username, email and password can't be empty."});
    return;
  }

  if (password !== repeatedPassword) {
    res.render("auth/signup", {messageError: "The passwords don't match."});
    return;
  }
})

/* GET login page */
signupRouter.get('/', (req, res, next) => {
  res.render('auth/signup');
});

module.exports = signupRouter;
