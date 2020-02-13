const express = require('express');
const router  = express.Router();

const loginRouter = require("./login");
const signupRouter = require("./signup");

// Router to /login endpoint
router.use('/login', loginRouter);

//Router to /signup endpoint
router.use('/signup', signupRouter);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
