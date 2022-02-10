import React, { useContext, useState, useEffect } from "react";
import { addOrder } from "../../api/Api";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:9000";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  //USE EFFECT
  const socket = socketIOClient(ENDPOINT);
  useEffect(() => {}, []);
  const totalAmount = `₪${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    console.log("cartCtx.items", cartCtx.items);
    console.log("userData", userData);

    let orderObj = {
      orderedItems: cartCtx.items,
      address: userData,
      // {
      // 	"city": "חדרה",
      // 	"street": "גפן",
      // 	"phone": "0526999999"
      // },

      // user: "620002210db586b17de812f2",
      user: props.user._id,
    };
    console.log("orderObj", orderObj);

    await addOrder(orderObj);
    // await fetch("https://react-http-4e5dc-default-rtdb.firebaseio.com/orders.json", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     user: userData,
    //     orderedItems: cartCtx.items,
    //   }),
    // });
    socket.emit("getOrder", "order sent");
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        סגור
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          לתשלום
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>{totalAmount}</span>
        <span>סה"כ לתשלום</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <div className={classes.actions}>
        <p>ההזמנה נשלחה בהצלחה</p>
        <button className={classes.button} onClick={props.onCloseCart}>
          סגור
        </button>
      </div>
    </React.Fragment>
  );
  console.log("props", props);
  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
