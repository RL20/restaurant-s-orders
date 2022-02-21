import React, { useState } from "react";
import { addMeal } from "../../../api/Api";
import "./Create.css";
function Create({ render }) {
  const [mealId, setMealId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [show, setShow] = useState(false);

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
    // this.props.parentCallBack(Obj);
    // this.props.parentCallBack(this.props.id, Obj);
    await addMeal(Obj);
    const [renderCom, setRenderCom] = render;
    setRenderCom(!renderCom);
    setShow(!show);
    setMealId("");
    setName("");
    setCategory("");
    setImage("");
    setDescription("");
    setPrice("");
  };
  const handleShow = () => {
    setShow(!show);
    console.log("show", show);
  };
  if (show) {
    return (
      <div className="create-form-wrap">
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
  return (
    <div>
      <button className="create-btn" onClick={handleShow}>
        הוספת ארוחה חדשה
      </button>
    </div>
  );
}

export default Create;
