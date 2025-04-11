import React, { useState } from "react";
import {
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">MINIMAL</div>
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes className="icon" /> : <FaBars className="icon" />}
        </div>
        <ul className={isOpen ? "navbar-links active" : "navbar-links"}>
          <Link to={"/home"}>
            <li>
              <FaHome className="icon" />
              <span>Home</span>
            </li>
          </Link>
          <Link to={"/cart"}>
            <li>
              <FaShoppingCart className="icon" />
              <span>Cart</span>
            </li>
          </Link>
          <Link to={"/login"}>
            <li>
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
