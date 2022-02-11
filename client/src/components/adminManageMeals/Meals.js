import React, { useState, useEffect } from "react";
import { getMeals, addMeal } from "../../api/Api";
import MealItem from "./MealItem";
import Create from "./Create";
import "../../styles/Meals.css";

// import Create from "./Create";

// rfce

function Meals() {
  const [meals, setMeals] = useState(null);
  const [renderCom, setRenderCom] = useState(false);

  useEffect(() => {
    const getAllMeals = async () => {
      const res = await getMeals();
      setMeals(res);
    };
    getAllMeals();
    return () => {};
  }, [renderCom]);
  // }, [meals]);

  const mealList = () => {
    return (
      meals &&
      meals.map((meal) => {
        return <MealItem key={meal._id} mealObj={meal} />;
      })
    );
  };

  return (
    <div className="containter-wrap">
      <Create render={[renderCom, setRenderCom]} />
      <div className="meal-list-grid">{mealList()}</div>
    </div>
  );
}

export default Meals;
