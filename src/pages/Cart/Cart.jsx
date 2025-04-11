import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Navbar } from "../../components";
import { Link, useLocation } from "react-router-dom";

export default function Cart() {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    const fetchCartData = async () => {
      setIsLoading(true);
      try {
        const cartId = location.state?.cartId || 1;
        
        const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`);
        const cartData = await response.json();
        
        if (!cartData || !cartData.products || cartData.products.length === 0) {
          if (location.state?.product) {
            setCartItems([{
              ...location.state.product,
              quantity: location.state.quantity || 1
            }]);
          } else {
            setCartItems([]);
          }
        } else {
          const productDetails = await Promise.all(
            cartData.products.map(async (item) => {
              const productResponse = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
              const product = await productResponse.json();
              return {
                ...product,
                quantity: item.quantity
              };
            })
          );
          
          setCartItems(productDetails);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart data");
        
        if (location.state?.product) {
          setCartItems([{
            ...location.state.product,
            quantity: location.state.quantity || 1
          }]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCartData();
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
      total + (formatPrice(item.price || item.Price) * item.quantity), 0).toFixed(2);
  };

  const updateQuantity = async (index, change) => {
    const updatedCart = [...cartItems];
    const newQuantity = updatedCart[index].quantity + change;
    
    if (newQuantity <= 0) {
      // Remove item
      removeItem(index);
    } else {
      try {
        updatedCart[index].quantity = newQuantity;
        setCartItems(updatedCart);
        
        const cartId = location.state?.cartId || 1;
        const productId = updatedCart[index].id;
        
        await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: 1,
            date: new Date().toISOString().slice(0, 10),
            products: updatedCart.map(item => ({
              productId: item.id,
              quantity: item.quantity
            }))
          })
        });
        
      } catch (err) {
        console.error("Error updating quantity:", err);
        updatedCart[index].quantity = updatedCart[index].quantity - change;
        setCartItems(updatedCart);
      }
    }
  };

  const removeItem = async (index) => {
    try {
      const updatedCart = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCart);
      
      const cartId = location.state?.cartId || 1;
      
      await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString().slice(0, 10),
          products: updatedCart.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        })
      });
      
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const cartId = location.state?.cartId || 1;
      
      await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: 'DELETE'
      });
      
      setShowConfirmation(true);
      setCartItems([]);
      
      setTimeout(() => {
        setShowConfirmation(false);
      }, 4000);
      
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="cart-container">
          <div className="loading">Loading cart data...</div>
        </div>
      </>
    );
  }

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
                  <p className="item-price">${formatPrice(item.price || item.Price).toFixed(2)}</p>
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
                <Link to="/" className="continue-shopping">
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