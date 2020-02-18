const express = require("express");
const sessionRouter = express.Router();

const Drink = require("./../models/Drink");
const Ingredient = require("./../models/Ingredient");
const User = require("./../models/User");

sessionRouter.use((req, res, next) => {
  //Everything below this are protected routes
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

//Router to POST a drink
sessionRouter.post("/add-drink", (req, res, next) => {
  let {
    name,
    glass,
    category,
    ingredients,
    amount,
    unit,
    garnish,
    preparation
  } = req.body;
  alcohol = req.body.alcohol === "on" ? true : false;

  if (name === "" || ingredients === "" || amount === "" || unit === "") {
    res.render("add-drink-form", {
      messageError: "You need to complete the required (*) info."
    });
    return;
  }

  Drink.findOne({ name })
    .then(drink => {
      if (drink) {
        res.render("add-drink-form", {
          messageError: "This drink name already exists."
        });
        return;
      }

      let allIngredients = [];
      if (Array.isArray(ingredients)) {
        ingredients.forEach((ingredient, i) => {
          Ingredient.find({ name: ingredient })
            .then(ingredientList => {
              if (ingredientList.length === 0) {
                Ingredient.create({ name: ingredient })
                  .then(() => console.log("Ingredient created."))
                  .catch(err => console.log(err));
              }
            })
            .catch(err => console.log(err));

            allIngredients.push({ name: ingredient, amount: amount[i], unit: unit[i] });
        });
      } else {
        allIngredients = [{name: ingredients, amount, unit}];
      }

      Drink.create({
        name,
        glass,
        category,
        ingredients: allIngredients,
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
    unit
  } = req.body;

  let ingredients = [];
  if (Array.isArray(ingredient)) {
    ingredient.forEach((item, i) => {
      ingredients.push({ name: item, amount: amount[i], unit: unit[i] });
    });
  } else {
    ingredients.push({ name: ingredient, amount, unit });
  }

  alcohol = req.body.alcohol === "on" ? true : false;

  Drink.find({_id: drinkId})
    .then( (drinkArr) => {
      let drink = drinkArr[0]
      if (String(drink.userId) === String(req.session.currentUser._id)) {
        Drink.findOneAndUpdate({userId: req.session.currentUser._id},
          {
          name,
          glass,
          category,
          ingredients,
          garnish,
          preparation,
          alcohol
          })
          .then(() => {
            res.redirect("/drinks");
          })
          .catch(err => console.log(err));
      } else {
        const private = true;
        const userId = req.session.currentUser._id;

        Drink.create({
          name,
          glass,
          category,
          ingredients,
          garnish,
          preparation,
          alcohol,
          userId,
          private,
        })
        .then( () => {
          res.redirect("/drinks");
        })
        .catch( (err) => console.log(err));
      }
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

//Router to delete a private drink
sessionRouter.get("/delete-drink/:drinkId", (req, res, next) => {
  Drink.findByIdAndRemove(req.params.drinkId)
    .then(() => {
      res.redirect("/drinks");
    })
    .catch(err => console.log(err));
});

sessionRouter.get("/drink/:drinkId", (req, res, next) => {
  const drinkId = req.params.drinkId;
  Drink.findOne({ _id: drinkId })
    .then(drink => {
      res.render("drink", { drink });
    })
    .catch(err => console.log(err));
});

//GET favourite of current user
sessionRouter.get("/favourites", (req, res, next) => {
  ///BACKLOG
  // Find the user
  User.findById(req.session.currentUser)
    .then(user => {
      favs = user.favorites;
      res.render("favourites", { favs });
    })
    .catch(err => {});
});

//Router to home page
sessionRouter.get("/", (req, res, next) => {
  res.render("index");
});

sessionRouter.get("/search-drinks", (req, res, next) => {
  Ingredient.find({})
    .then(ingredients => {
      res.render("find-drinks", { ingredients });
    })
    .catch(err => console.log(err));
});

sessionRouter.post("/search-drinks", (req, res, next) => {
  const { name, ingredients } = req.body;
  nameArr = name ? name.trim().split(" ") : [];
  ingArr = ingredients ? ingredients.trim().split(" ") : [];
  const searchQuery = {};
  const regexName = nameArr.join("|");
  const regexIng = ingArr.join("|");

  if (nameArr.length > 0) {
    searchQuery.name = { $regex: regexName, $options: "i" };
  }
  if (ingArr.length > 0) {
    searchQuery.ingredientNameArray = {
      $regex: regexIng,
      $options: "i"
    };
  }
  Drink.find(searchQuery)
    .then(searchQuery => {
      res.render("search-result", { searchQuery });
    })
    .catch(err => {
      console.log(err);
    });
});

sessionRouter.get("/drinks", (req, res, next) => {
  Drink.find({ private: false })
    .then(publicDrinks => {
      Drink.find({ userId: req.session.currentUser })
        .then(userDrinks => {
          publicDrinks.concat(userDrinks);
          let drinksArr = publicDrinks.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          })
          res.render("all-drinks", { drinksArr });
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
  const user = req.session.currentUser;
  res.render("profile", {user});
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

//Delete user account
sessionRouter.get("/delete-account", (req, res) => {
  User.findByIdAndRemove(req.session.currentUser)
    .then(() => {
      req.session.destroy(err => {
        if (err) {
          res.redirect("/");
        } else {
          res.redirect("/signup");
        }
      });
    })
    .catch(err => console.log(err));
});

module.exports = sessionRouter;
