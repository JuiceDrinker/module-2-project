const express = require("express");
const sessionRouter = express.Router();

const Drink = require("./../models/Drink");
const Ingredient = require("./../models/Ingredient");
const User = require("./../models/User");

sessionRouter.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

//Router to POST a drink
sessionRouter.post("/add-drink", (req, res, next) => {
  const {
    name,
    glass,
    category,
    ingredient,
    amount,
    unit,
    garnish,
    preparation
  } = req.body;
  alcohol = req.body.alcohol === "on" ? true : false;

  if (name === "" || ingredient === "" || amount === "" || unit === "") {
    res.render("add-drink-form", {
      messageError: "You need to complete the required (*) info."
    });
    return;
  }
  const ingredients = [{name: ingredient, unit, amount}]

  Drink.findOne({name})
    .then( (drink) => {
      if (drink) {
        res.render("add-drink-form", {messageError: "This drink name already exists."});
        return;
      }

      Drink.create({
        name,
        glass,
        category,
        ingredients,
        garnish,
        preparation,
        alcohol,
        private: true,
        userId: req.session.currentUser._id,
      })
        .then((drink) => {
          User.findOneAndUpdate({_id: user._id}, {$push: {privateDrinks: {drinkId: drink._id}}})
            .then( () => {
              res.redirect(`/drink/${drink._id}`);
            })
            .catch( (err) => console.log(err));
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch( (err) => console.log(err));
});

//Router to home page
sessionRouter.get("/", (req, res, next) => {
  res.render("index");
});

sessionRouter.get("/drink/:id", (req, res, next) => {
  const drinkId = req.params.id;
  Drink.findOne({_id: drinkId})
    .then( (drink) => {
      res.render("drink", {drink});
    })
    .catch( (err) => console.log(err));
});

sessionRouter.get("/drinks", (req, res, next) => {
  Ingredient.find({})
    .then( (ingredients) => {
      res.render("find-drinks", {ingredients});
    })
    .catch( (err) => console.log(err))
});

sessionRouter.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});

//Router to add drink form page
sessionRouter.get("/add-drink", (req, res, next) => {
  res.render("add-drink-form");
});

//Router to profile page
sessionRouter.get("/my-profile", (req, res, next) => {
  res.render("profile");
});

//Router to random drink page
sessionRouter.get("/random-drink", (req, res, next) => {
  Drink.aggregate([{ $sample: { size: 1 } }]) //Returns a random drink from collection "Drinks"
    .then(randomDrinkObj => {
      const drinkObj = randomDrinkObj[0];
      res.render("random-drink", { drinkObj });
    })
    .catch(err => console.log(err));
});

module.exports = sessionRouter;
