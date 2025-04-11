import React, { useState } from "react";
import "./FullProductPage.css";
import { Navbar } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";

export default function FullProductPage() {
  const data = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1, 
          date: new Date().toISOString().slice(0, 10),
          products: [{
            productId: data.state.id || 1, 
            quantity: 1
          }]
        })
      });
      
      const result = await response.json();
      console.log('Cart updated:', result);
      
      navigate("/cart", {
        state: {
          product: data.state,
          quantity: 1,
          cartId: result.id 
        }
      });
      
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-page">
        <div className="product-image">
          <img src={data.state.image} alt={data.state.title} />
        </div>
        <div className="product-details">
          <h1>{data.state.title}</h1>
          <p className="category">{data.state.category}</p>
          <p className="price">${data.state.Price}</p>
          <h3>Description</h3>
          <p className="description">{data.state.description}</p>
          
          {error && <p className="error-message">{error}</p>}
          
          <button
            onClick={addToCart}
            className="add-to-cart"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
}