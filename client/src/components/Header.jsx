import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <div>
      <header>
        <div className="btns">
          <Link to="/admin/ordersdone">
            <button>היסטורית הזמנות</button>
          </Link>
          {/* <Link to="/users">
          <button>Users</button>
        </Link> */}
          <Link to="/admin/orders">
            <button>הזמנות</button>
          </Link>
          <Link to="/admin/actions">
            <button>פעולות</button>
          </Link>
          <Link to="/admin">
            <button>בית</button>
          </Link>
        </div>
      </header>
    </div>
  );
}
