const express = require("express");
const router = express.Router();

const loginRouter = require("./login");
const signupRouter = require("./signup");
const sessionRouter = require("./sessionConnected");

// Router to login page
router.use("/login", loginRouter);

//Router to signup page
router.use("/signup", signupRouter);

// Protected routes
router.use("/", sessionRouter);

module.exports = router;
