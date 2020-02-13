const express = require('express');
const router  = express.Router();

const loginRouter = require("./login");
const signupRouter = require("./signup");

// Router to login page
router.use('/login', loginRouter);

//Router to signup page
router.use('/signup', signupRouter);


//Router to profile page
router.get('/my-profile', (req, res, next) => {
  res.render('profile');
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
