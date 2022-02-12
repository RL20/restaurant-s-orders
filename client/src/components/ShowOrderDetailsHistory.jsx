import React, { useState, useEffect } from "react";
import { deleteOrder, updateOrderStatus } from "../api/Api";

function ShowOrderDetailsHistory({ orderId, details, setOrders, orders, setOrdersDetails }) {
  const [show, setShow] = useState([]);
  console.log("details", details);

  const style = (index) => {
    const newShow = show.map((e) => false); //init to false
    newShow[index] = !show[index];
    setShow(newShow);
  };

  const handleCancel = async (id) => {
    console.log("order id canceled", id);
    await deleteOrder(id);
    const newOrder = orders.filter((order) => order._id !== id);
    setOrders(newOrder);
    setOrdersDetails(null);
  };
  return (
    <div>
      <h2> פרטי הזמנה</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <td>סה"כ</td>
            <td>מחיר</td>
            <td>כמות</td>
            <td>פריט</td>
          </tr>
        </thead>
        <tbody>
          {details.length !== 0 &&
            details.map((item, i) => {
              return (
                <tr className={show[i] ? "active-row" : ""} key={i} onClick={() => style(i)}>
                  <td>{item.price * item.amount}</td>
                  <td>{item.price}</td>
                  <td>{item.amount}</td>
                  <td>{item.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button className="btn" onClick={() => handleCancel(orderId)}>
        מחק הזמנה
      </button>
    </div>
  );
}

export default ShowOrderDetailsHistory;
