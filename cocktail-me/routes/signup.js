const express = require('express');
const signupRouter  = express.Router();

/* GET login page */
signupRouter.get('/', (req, res, next) => {
  res.render('auth/signup');
});

module.exports = signupRouter;
