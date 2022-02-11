import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <div>
      <header>
        <div className="btns">
          <Link to="/admin">
            <button>HomePage</button>
          </Link>
          <Link to="/admin/orders">
            <button>Orders</button>
          </Link>
          {/* <Link to="/users">
          <button>Users</button>
        </Link> */}
          <Link to="/admin/actions">
            <button>Actions</button>
          </Link>
        </div>
      </header>
    </div>
  );
}
