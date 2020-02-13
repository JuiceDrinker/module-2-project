const express = require('express');
const router  = express.Router();

const loginRouter = require("./login");

// Router to /login endpoint
router.use('/login', loginRouter);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
