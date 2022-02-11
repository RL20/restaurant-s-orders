const mongoose = require("mongoose");
const validator = require("validator");

const Meal = mongoose.model("Meal", {
  mealId: { type: String, required: true },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    // minlength: 10,
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("price must be a positive number");
      }
    },
  },
});

module.exports = Meal;
