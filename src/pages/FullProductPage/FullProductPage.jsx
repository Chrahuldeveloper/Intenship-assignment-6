import React from "react";
import "./FullProductPage.css";
import { Navbar } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function FullProductPage() {
  const data = useLocation();

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-image">
          <img src={data.state.image} alt="Minimalist White T-Shirt" />
        </div>
        <div className="product-details">
          <h1>{data.state.title}</h1>
          <p className="category">{data.state.category}</p>
          <p className="price">{data.state.Price}</p>
          <h3>Description</h3>
          <p className="description">{data.state.description}</p>
          <button
            onClick={() => {
              navigate("/cart", {
                state: {
                  product: data.state,
                  quantity: 1,
                },
              });
            }}
            className="add-to-cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
