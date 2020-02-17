const express = require('express');
const loginRouter  = express.Router();

const User = require("./../models/User");

const bcrypt = require("bcrypt");

/* GET login page */
loginRouter.post('/', (req, res, next) => {
  const {username, password} = req.body;

  if (username === "" || password === "") {
    res.render("auth/login", {messageError: "The username, email and password can't be empty."});
    return;
  }

  User.findOne({username})
    .then( (user) => {
      if (!user) {
        res.render("auth/login", {messageError: "This username does not exist, try to signup."});
        return;
      }

      //const salt = bcrypt.genSaltSync(saltRounds);
      const correctPassword = bcrypt.compareSync(password, user.password);
      console.log(correctPassword)

      if (correctPassword) {
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/login", {messageError: "Wrong password."});
        return;
      }
    })

    .catch( (err) => console.log(err));
});

/* GET login page as home page */
loginRouter.get('/', (req, res, next) => {
  res.render('auth/login');
});

module.exports = loginRouter;
