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

//GET favourite of current user
sessionRouter.get("/favourites", (req, res, next) => {
  // Find the user
  User.findById(req.session.currentUser)
    .then(user => {
      favs = user.favorites;
      res.render("favourites", { favs });
    })
    .catch(err => {});
});

//Router to POST a drink
sessionRouter.post("/add-drink", (req, res, next) => {
  let {
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

  let newIngredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
  Ingredient.find({name: newIngredient})
    .then( (ingredientList) => {
      if(ingredientList.length === 0) {
        Ingredient.create({name: newIngredient})
          .then( () => console.log("Ingredient created."))
          .catch( (err) => console.log(err));
      }
    })
    .catch( (err) => console.log(err));

  Drink.findOne({ name })
    .then(drink => {
      if (drink) {
        res.render("add-drink-form", {
          messageError: "This drink name already exists."
        });
        return;
      }
      const ingredients = [{name: newIngredient, amount, unit}]
      Drink.create({
        name,
        glass,
        category,
        ingredients,
        garnish,
        preparation,
        alcohol,
        private: true,
        userId: req.session.currentUser._id
      })
        .then(drink => {
          User.findOneAndUpdate(
            { _id: User._id },
            { $push: { privateDrinks: { drinkId: drink._id } } }
          )
            .then(() => {
              res.redirect(`/drink/${drink._id}`);
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => console.log(err));
});

//Router to modify one drink
sessionRouter.post("/modify-drink/:drinkId", (req, res, next) => {
  const drinkId = req.params.drinkId;
  const {
    name,
    glass,
    category,
    garnish,
    preparation,
    ingredient,
    amount,
    unit,
  } = req.body;

  let ingredients = [];
  ingredient.forEach((item, i) => {
    ingredients.push({name: item, amount: amount[i], unit: unit[i]});
  });

  alcohol = req.body.alcohol === "on" ? true : false;

  Drink.findOneAndUpdate(
    { userId: req.session.currentUser },
    {
      name,
      glass,
      category,
      ingredient,
      amount,
      unit,
      garnish,
      preparation,
      alcohol
    },
    { new: true }
  )
    .then(() => {
      res.redirect("/drinks");
    })
    .catch(err => console.log(err));
});

//Router to modify one drink
sessionRouter.get("/modify-drink/:drinkId", (req, res, next) => {
  Drink.findById(req.params.drinkId)
    .then(drink => {
      res.render("modify-drink-form", { drink });
    })
    .catch(err => console.log(err));
});

//Router to home page
sessionRouter.get("/", (req, res, next) => {
  res.render("index");
});

sessionRouter.get("/drink/:drinkId", (req, res, next) => {
  const drinkId = req.params.drinkId;
  Drink.findOne({ _id: drinkId })
    .then(drink => {
      res.render("drink", { drink });
    })
    .catch(err => console.log(err));
});

sessionRouter.get("/search-drinks", (req, res, next) => {
  Ingredient.find({})
    .then(ingredients => {
      res.render("find-drinks", { ingredients });
    })
    .catch(err => console.log(err));
});

sessionRouter.get("/drinks", (req, res, next) => {
  Drink.find({ private: false })
    .then(publicDrinks => {
      Drink.find({ userId: req.session.currentUser })
        .then(userDrinks => {
          res.render("all-drinks", { publicDrinks, userDrinks });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
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
