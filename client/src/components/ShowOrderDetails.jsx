import React, { useState, useEffect } from "react";

function ShowOrderDetails({ details }) {
  const [show, setShow] = useState([]);

  const style = (index) => {
    const newShow = show.map((e) => false); //init to false
    newShow[index] = !show[index];
    setShow(newShow);
  };

  return (
    <div>
      <h2> פרטי הזמנה</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <td> סה"כ </td>
            <td> מחיר </td>
            <td> כמות </td>
            <td> פריט </td>
          </tr>
        </thead>
        <tbody>
          {details.length !== 0 &&
            details.map((item, i) => {
              return (
                <tr className={show[i] ? "active-row" : ""} key={i} onClick={() => style(i)}>
                  <td> {item.price * item.amount}</td>
                  <td> {item.price}</td>
                  <td> {item.amount}</td>
                  <td> {item.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button className="btn">ביטול הזמנה</button>
      <button className="btn">שינוי הזמנה</button>
      <button className="btn">בוצע</button>
    </div>
  );
}

export default ShowOrderDetails;
