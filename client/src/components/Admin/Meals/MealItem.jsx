import React, { useState, useEffect } from "react";
// import Update from "./Update";
import Update from "../Update/Update";
import { updateMeal, deleteMeal } from "../../../api/Api";

import "./MealItem.css";

function MealItem({ mealObj, callBackParent }) {
  const { _id, mealId, category, image, name, description, price } = mealObj;
  const [show, setShow] = useState(false);

  const handelDelete = async (_id) => {
    console.log("delet meal fetch");
    await deleteMeal(_id);
    // window.location.reload();
    callBackParent();
  };
  // const handelUpdate = async (_id, obj) => {
  //   console.log("updat meal");
  //   await updateMeal(_id, obj);
  //   setShow(!show);
  // };

  // const setShow = () => {
  //   SetIsShow(!isShow);
  // };

  if (show) return <Update id={_id} showState={[show, setShow]} callBackParent={callBackParent} mealObj={{ _id, mealId, category, image, name, description, price }} />;
  return (
    <div className="meal-card">
      <h3>{`  ${mealId} :מזהה ארוחה`}</h3>
      <img className="meal-image" src={image} alt="" />
      <h4>{`שם ארוחה: ${name}`}</h4>
      <h4>{` קטגוריה: ${category}`}</h4>
      <h4>{`תיאור:${description}`}</h4>
      <h4>{`מחיר: ${price}`}&#8362;</h4>

      <button onClick={(e) => handelDelete(mealObj._id, e)}>מחק מנה</button>
      <button onClick={() => setShow(!show)}>עדכן מנה</button>
    </div>
  );
}

export default MealItem;
