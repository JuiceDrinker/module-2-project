const express = require('express');
const signupRouter  = express.Router();

const User = require("./../models/User");

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;

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

  User.findOne({username})
    .then( (user) => {
      if (user) {
        res.render("auth/signup", {messageError: "This username already exists."});
        console.log(user)
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ username, email, hashedPassword, terms, news })
        .then( (user) => {
          res.redirect("/");
        })
        .catch( (err) => {
          res.render("auth/signup", {messageError: "Error while creating the new user."})
          console.log(err);
        });
    })
    .catch( (err) => console.log(err));
})

/* GET login page */
signupRouter.get('/', (req, res, next) => {
  res.render('auth/signup');
});

module.exports = signupRouter;
