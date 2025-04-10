import React from "react";
import "./Cart.css";
import { Navbar } from "../../components";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <>
      <Navbar />
      <div className="cart-container">
        <div className="cart-message">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart and they will show up here</p>
          <Link to="/" className="continue-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
