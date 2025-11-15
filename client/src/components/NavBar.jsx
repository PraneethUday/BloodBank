import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar slide-in">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" style={{ textDecoration: "none" }}>
          <img
            src="/images/logo.webp"
            alt="BloodBank Logo"
            className="navbar-logo-img"
          />
          BloodBank
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/donate">Donate</Link>
              </li>
              <li>
                <Link to="/blood-stock">Blood Stock</Link>
              </li>
              <li>
                <Link to="/request-blood">Request Blood</Link>
              </li>
              <li>
                <span className="user-info">Welcome, {user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="signup-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
