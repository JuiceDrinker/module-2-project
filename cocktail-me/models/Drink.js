const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkModel = new Schema ({
  name: {type: String, unique: true, required: true},
  glass: {type: String},
  category: {type: String},
  ingredients: [{
    unit: {type: String},
    amount: {type: Number},
    name: {type: String},
    ingredientID: {type: Schema.Types.ObjectId, ref: "Ingredient", default: null},
  }],
  alcohol: {type: Boolean},
  garnish: {type: String},
  preparation: {type: String},
  private: {type: Boolean, default: false}, // if is true means that the user who created it is the only that can see it
  userId: {type: Schema.Types.ObjectId, ref: "User", default: null}, // if is null means that is global
});

const Drink = mongoose.model("Drink", drinkModel);

module.exports = Drink;
