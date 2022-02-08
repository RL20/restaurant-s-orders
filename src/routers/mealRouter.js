const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();
const { getMeals, getMeal, addMeal, updateMeal, removeMeal } = require("../controllers/mealController");

router.get("/meals", getMeals);
router.get("/meals/:id/", getMeal);
router.post("/meals", addMeal);
router.put("/meals/:id/", updateMeal);
router.delete("/meals/:id/", removeMeal);

// router.get("/meals", auth, getMeals);
// router.get("/meals/:id/", auth, getMeal);
// router.post("/meals", auth, addMeal);
// router.put("/meals/:id/", auth, updateMeal);
// router.delete("/meals/:id/", auth, removeMeal);

module.exports = router;
