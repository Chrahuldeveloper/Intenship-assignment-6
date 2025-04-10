import React from "react";
import "./FullProductPage.css";
import { Navbar } from "../../components";

export default function FullProductPage() {
  return (
    <>
      <Navbar />

      <div className="product-page">
        <div className="product-image">
          <img
            src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Minimalist White T-Shirt"
          />
        </div>
        <div className="product-details">
          <h1>Minimalist White T-Shirt</h1>
          <p className="category">clothing</p>
          <p className="price">$29.99</p>
          <h3>Description</h3>
          <p className="description">
            Premium cotton t-shirt with a minimalist design, perfect for casual
            wear.
          </p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </>
  );
}
