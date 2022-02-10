import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header>
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
      </header>
    </div>
  );
}
