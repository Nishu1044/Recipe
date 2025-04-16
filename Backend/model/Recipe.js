const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  // recipeId: Number,
  recipeId: String, 
  userId: String,// To associate recipes with users
});

const RecipeModel=mongoose.model("Recipe", RecipeSchema);
module.exports = RecipeModel
