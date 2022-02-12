import React, { useState } from "react";
import { updateMeal } from "../../api/Api";
import "../../styles/Form.css";

function Update({ mealObj, showState, callBackParent }) {
  const [mealId, setMealId] = useState(mealObj.mealId);
  const [name, setName] = useState(mealObj.name);
  const [category, setCategory] = useState(mealObj.category);
  const [image, setImage] = useState(mealObj.image);
  const [description, setDescription] = useState(mealObj.description);
  const [price, setPrice] = useState(mealObj.price);

  const inputValue = (e) => {
    switch (e.target.name) {
      case "mealId":
        setMealId(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "image":
        setImage(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      default:
    }
  };
  const confirm = async (e) => {
    e.preventDefault();
    const Obj = { mealId, category, image, name, description, price };
    await updateMeal(mealObj._id, Obj);
    const [show, setShow] = showState;
    setShow(!show);
    // window.location.reload();
    callBackParent();
  };
  return (
    <div className="form-container">
      <form onSubmit={confirm} className="create-form" action="">
        <label htmlFor="mealId">מזהה ארוחה</label>
        <input value={mealId} onChange={inputValue} name="mealId" id="name" type="text" />

        <label htmlFor="name">שם ארוחה </label>
        <input value={name} onChange={inputValue} name="name" id="link" type="text" />

        <label htmlFor="category">קטגוריה</label>
        <input value={category} onChange={inputValue} name="category" id="code" type="text" />

        <label htmlFor="image">תמונה</label>
        <input value={image} onChange={inputValue} name="image" id="price" type="text" />

        <label htmlFor="description">תיאור</label>
        <input value={description} onChange={inputValue} name="description" id="price" type="text" />

        <label htmlFor="price">מחיר</label>
        <input value={price} onChange={inputValue} name="price" id="price" type="text" />
        <button className="btn" type="submit">
          אישור
        </button>
      </form>
    </div>
  );
}

export default Update;
