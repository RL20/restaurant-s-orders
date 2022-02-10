import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import axios from "axios";
import { getMeals } from "../../api/Api";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await getMeals();

      if (!response.status === 200) {
        throw new Error("Something went wrong!");
      }

      const responseData = response;

      // const responseData1 = [
      //   { description: "שווארמה בפיתה ,חומוס,צ'יפס,סלט", name: "שווארמה", price: 37, image: "https://files.mishloha.co.il/files/menu_food_pic/thumbnail/FIL_6414381_1634718393533.jpg?v=2" },
      //   { description: " פלאפל בפיתה  ", name: "פלאפל", price: 37, image: "https://files.mishloha.co.il/files/menu_food_pic/thumbnail/FIL_6414381_1634718393533.jpg?v=2" },
      //   { description: "שניצל בבגאט", name: "שניצל", price: 37, image: "https://files.mishloha.co.il/files/menu_food_pic/thumbnail/FIL_6414381_1634718393533.jpg?v=2" },
      // ];

      const loadedMeals = [];

      for (const item of responseData) {
        loadedMeals.push({
          id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  //!add image
  const mealsList = meals.map((meal) => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} image={meal.image} price={meal.price} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
