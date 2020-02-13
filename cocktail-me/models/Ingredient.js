const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientModel = new Schema({
  name: {type: String, required: true, unique: true},
});

const Ingredient = mongoose.model("Ingredient", ingredientModel);

module.exports = Ingredient;
