const express = require('express');
const sessionRouter  = express.Router();

sessionRouter.use((req, res, next) => {
  if (req.session.currentUser) { 
    next();
  }
  else {
  	res.redirect("/login");
  }
});

//Router to POST a drink
sessionRouter.post("/add-drink", (req, res, next) => {
  const {name, glass, category, ingredient, amount, unit, garnish, preparation, alcohol} = req.body;

  if (name === "" || ingredient === "" || amount === "" || unit === "") {
    res.render("add-drink-form", {messageError: "You need to complete the require (*) info."})
    return;
  }
});

//Router to home page
sessionRouter.get('/', (req, res, next) => {
  res.render('index');
});

//Router to add drink form page
sessionRouter.get('/add-drink', (req, res, next) => {
  res.render('add-drink-form');
});

//Router to profile page
sessionRouter.get('/my-profile', (req, res, next) => {
  res.render('profile');
});

//Router to random drink page
sessionRouter.get('/random-drink', (req, res, next) => {
  res.render('random-drink');
});

module.exports = sessionRouter;
