import React from "react";
import { FaHome, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MINIMAL</div>
      <ul className="navbar-links">
        <li>
          <FaHome className="icon" />
          <span>Home</span>
        </li>
        <li>
          <FaShoppingCart className="icon" />
          <span>Cart</span>
        </li>
        <li>
          <FaSignOutAlt className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </nav>
  );
}
