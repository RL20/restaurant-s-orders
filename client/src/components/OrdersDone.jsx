import React, { useState, useEffect } from "react";
import { getOrdersHistory } from "../api/Api";
import "../styles/users.css";
import ShowOrderDetails from "./ShowOrderDetails.jsx";

export default function OrdersDone() {
  const [orders, setOrders] = useState(null);
  const [ordersDetails, setOrdersDetails] = useState(null);
  const [show, setShow] = useState([]);

  const getAllOrders = async () => {
    const data = await getOrdersHistory();
    console.log("Orders", data);
    setOrders(data);
  };

  useEffect(() => {
    getAllOrders();
    return () => {};
  }, []);
  const style = (index, order) => {
    const newShow = show.map((e) => false); //init to false
    newShow[index] = !show[index];
    setShow(newShow);
    setOrdersDetails(order.orderedItems);
  };

  const showOrders = () => {
    return (
      <div className="wrap-table">
        <div className="order-details">{ordersDetails && <ShowOrderDetails details={ordersDetails} />}</div>
        <div className="user-info">
          <table className="styled-table">
            <thead>
              <tr>
                <td> טלפון </td>
                <td> עיר </td>
                <td> רחוב </td>
                <td> תאריך </td>
                <td> שם לקוח </td>
                <td> מספר הזמנה </td>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length &&
                orders.map((order, i) => {
                  return (
                    <tr className={show[i] ? "active-row" : ""} key={i} onClick={() => style(i, order)}>
                      <td> {order.address.phone}</td>
                      <td> {order.address.city}</td>
                      <td> {order.address.street}</td>
                      <td> {order.dateAdded}</td>
                      <td> {order.user.name}</td>
                      <td> {order._id}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  return <div>{OrdersDone && showOrders()}</div>;
}
