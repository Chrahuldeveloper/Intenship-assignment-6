import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Navbar } from "../../components";
import { Link, useLocation } from "react-router-dom";

export default function Cart() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    if (location.state?.product) {
      setCartItems([{...location.state.product, quantity: 1}]);
    }
  }, [location.state]);

  const formatPrice = (price) => {
    if (!price) return 0;
    
    if (typeof price === 'number') return price;
    
    if (typeof price === 'string') {
      return parseFloat(price.replace(/[^\d.-]/g, '') || 0);
    }
    
    return 0;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (formatPrice(item.Price) * item.quantity), 0).toFixed(2);
  };

  const updateQuantity = (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + change;
    
    if (newQuantity <= 0) {
      removeItem(index);
    } else {
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    setShowConfirmation(true);
    setCartItems([]);
    
    setTimeout(() => {
      setShowConfirmation(false);
    }, 4000);
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {cartItems.length === 0 && !showConfirmation ? (
          <div className="cart-message">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart and they will show up here</p>
            <Link to="/" className="continue-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-items">
            <h1>Your Cart</h1>
            
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">${formatPrice(item.Price).toFixed(2)}</p>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(index, -1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(index, 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {cartItems.length > 0 && (
              <div className="cart-summary">
                <div className="subtotal">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
                <Link to="/home" className="continue-shopping">
                  Continue Shopping
                </Link>
              </div>
            )}
            
            {showConfirmation && (
              <div className="confirmation-popup">
                <div className="confirmation-content">
                  <h3>Order placed successfully!</h3>
                  <p>Thank you for your purchase.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}