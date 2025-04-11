import React, { useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import FullProductPage from "./pages/FullProductPage/FullProductPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

export default function App() {
  const [hasToken, setHasToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = localStorage.getItem("jwt");
    setHasToken(!!getUser);
    setLoading(false);
  }, []);

  const renderSignup = () => {
    if (loading) return <div>Loading...</div>;

    return hasToken ? <Navigate to="/home" /> : <Signup />;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={renderSignup()} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<FullProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}
