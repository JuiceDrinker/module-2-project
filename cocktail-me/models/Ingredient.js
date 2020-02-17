const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientModel = new Schema({
  name: {type: String, required: true, unique: true},
  category: {type: String, required: true}
});

const Ingredient = mongoose.model("Ingredient", ingredientModel);

module.exports = Ingredient;
