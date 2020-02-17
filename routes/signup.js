const express = require("express");
const signupRouter = express.Router();

const User = require("./../models/User");

const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;

//Create a user
signupRouter.post("/", (req, res, next) => {
  const { username, email, password, repeatedPassword, terms, news } = req.body;
  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", {
      messageError: "The username, email and password can't be empty."
    });
    return;
  }

  if (password !== repeatedPassword) {
    res.render("auth/signup", { messageError: "The passwords don't match." });
    return;
  }

  if (!terms === "on") {
    res.render("auth/signup", {
      messageError: "You need to accept our Terms and Services."
    });
    return;
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        res.render("auth/signup", {
          messageError: "This email is already taken"
        });
      }
    })
    .catch(err => console.log(err));
    
  User.findOne({ username })
    .then(user => {
      if (user) {
        res.render("auth/signup", {
          messageError: "This username already exists."
        });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({ username, password: hashedPassword, email, terms: true })
        .then(user => {
          res.redirect("/");
        })
        .catch(err => {
          res.render("auth/signup", {
            messageError: "Error while creating the new user."
          });
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

/* GET login page */
signupRouter.get("/", (req, res, next) => {
  res.render("auth/signup");
});

module.exports = signupRouter;
