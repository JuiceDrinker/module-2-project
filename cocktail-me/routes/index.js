const express = require('express');
const router  = express.Router();

const authRouter = require("./auth");

router.use('/login', authRouter);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


module.exports = router;
