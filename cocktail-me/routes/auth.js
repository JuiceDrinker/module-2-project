const express = require('express');
const authRouter  = express.Router();

/* GET login page */
authRouter.get('/', (req, res, next) => {
  res.render('auth/login');
});

module.exports = authRouter;
