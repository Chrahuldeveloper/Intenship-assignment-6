import React from "react";
import "./Signup.css";

export default function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign up</h2>
        <form>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />

          <button type="submit">Create account</button>
        </form>
        <p className="note">
          Use any details to create an account for this demo
        </p>
      </div>
    </div>
  );
}
