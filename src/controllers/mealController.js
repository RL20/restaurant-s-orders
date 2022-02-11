const Meal = require("../models/meal");

//get all meals
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({});
    res.status(200).send(meals);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
  }
};

//get meal by id
const getMeal = async (req, res) => {
  const _id = req.params.id;
  try {
    const meal = await Meal.findOne({ _id });
    if (!meal) {
      console.log("userinside", meal);
      return res.status(404).send(`Meal not found`);
    }
    res.status(200).send(meal);
  } catch (error) {
    res.status(500).send({ error: " Internal Server Error" });
  }
};

//add meal
const addMeal = async (req, res) => {
  console.log("req.body", req.body);
  const meal = new Meal(req.body);
  try {
    console.log(meal);
    await meal.save();
    res.status(201).send(meal);
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

//update meal
const updateMeal = async (req, res) => {
  const updates = Object.keys(req.body);
  console.log("req.body", req.body);

  const allowUpdates = ["mealId", "category", "image", "name", "description", "price"];
  const isValidOperation = updates.every((update) => {
    return allowUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }
  try {
    const updateMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateMeal) {
      return res.status(404).send({ error: `no such ${req.params.id} to update` });
    }
    res.status(200).send(updateMeal);
  } catch (error) {
    // res.status(400).send({ message: "Bad Request" });
    res.status(400).send({ error });
  }
};

//Remove meal
const removeMeal = async (req, res) => {
  const id = req.params.id;
  try {
    const meal = await Meal.findOneAndDelete({ _id: id });
    if (!meal) {
      return res.status(404).send({ error: `Meal  not found` });
    }
    res.status(200).send(meal);
  } catch (error) {
    res.status(400).send({ message: "Bad Request" });
  }
};

module.exports = {
  getMeals,
  getMeal,
  addMeal,
  updateMeal,
  removeMeal,
};
