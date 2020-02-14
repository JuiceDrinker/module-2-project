const express = require("express");
const router = express.Router();
const loginRouter = require("./login");
const signupRouter = require("./signup");
const Drink = require("./../models/Drink");
// Router to login page
router.use("/login", loginRouter);

//Router to signup page
router.use("/signup", signupRouter);

//Router to POST a drink
router.post("/add-drink", (req, res, next) => {
  const {
    name,
    glass,
    category,
    ingredient,
    amount,
    unit,
    garnish,
    preparation,
    alcohol
  } = req.body;

  if (name === "" || ingredient === "" || amount === "" || unit === "") {
    res.render("add-drink-form", {
      messageError: "You need to complete the require (*) info."
    });
    return;
  }
});

//Router to home page
router.get('/home', (req, res, next) => {
  res.render('index');
});

//Router to add drink form page
router.get("/add-drink", (req, res, next) => {
  res.render("add-drink-form");
});

//Router to profile page
router.get("/my-profile", (req, res, next) => {
  res.render("profile");
});

//Router to random drink page
router.get("/random-drink", (req, res, next) => {
  Drink.aggregate([{ $sample: { size: 1 } }]) //Returns a random drink from collection "Drinks"
    .then(randomDrinkObj => {
      const drinkObj = randomDrinkObj[0];
      res.render("random-drink", { drinkObj });
    })
    .catch(err => console.log(err));
});

/* GET login page as home page */
router.get("/", (req, res, next) => {
  res.render("auth/login");
});

module.exports = router;
