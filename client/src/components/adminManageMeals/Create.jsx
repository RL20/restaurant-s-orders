import React, { useState } from "react";
import { addMeal } from "../../api/Api";

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
// import "../style/Create.css";

// class Create extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { name: "", image: "", code: "", price: "", show: false };
//   }

//   inputValue = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   confirm = (e) => {
//     e.preventDefault();
//     const { name, image, code, price } = this.state;
//     const Obj = { name, image, code, price };
//     this.props.parentCallBack(Obj);
//     this.setState({ name: "", image: "", code: "", price: "" });
//     this.setShow();
//   };
//   setShow = () => {
//     this.setState((prevState) => {
//       return { show: !prevState.show };
//     });
//   };
//   render() {
//     if (this.state.show !== true)
//       return (
//         <button className="btn" onClick={this.setShow}>
//           Add Item
//         </button>
//       );
//     return (
//       <div>
//         <form onSubmit={this.confirm} className="create-form" action="">
//           <label htmlFor="name">Artist name</label>
//           <input value={this.state.name} onChange={this.inputValue} name="name" id="name" type="text" />

//           <label htmlFor="link">Image Link</label>
//           <input value={this.state.image} onChange={this.inputValue} name="image" id="link" type="text" />

//           <label htmlFor="code">Item code</label>
//           <input value={this.state.code} onChange={this.inputValue} name="code" id="code" type="text" />

//           <label htmlFor="price">Price</label>
//           <input value={this.state.price} onChange={this.inputValue} name="price" id="price" type="text" />
//           <button className="btn" type="submit">
//             Add Item
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Create;
