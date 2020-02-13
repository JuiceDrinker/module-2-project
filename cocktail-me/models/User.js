const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {type: String, unique: true, required: true},
  password: {type: String, required:true},
  email: {type: String, unique: true, required: true},
  privateDrinks: [{
    drinkId: {type: Schema.Types.ObjectId, ref: "Drink"}, //show drinks created only by user
  }],
  favorites: [{
    drinkId: {type: Schema.Types.ObjectId, ref: "Drink"}, //show global and private drinks
  }],
  notes: [{
    drinkId: {type: Schema.Types.ObjectId, ref: "Drink"},
    text: {type: String},
  }],
  terms: {type: Boolean, default: false},
  newsletter: {type: Boolean, default: false},
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
