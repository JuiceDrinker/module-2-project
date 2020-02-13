const express = require('express');
const loginRouter  = express.Router();

/* GET login page */
loginRouter.get('/', (req, res, next) => {
  res.render('auth/login');
});

module.exports = loginRouter;
