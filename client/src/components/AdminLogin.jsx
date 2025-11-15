import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "admin") {
      const adminUser = { email: "admin", name: "Admin", role: "admin" };
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("user", JSON.stringify(adminUser));
      setMessage("Admin login successful!");
      onLogin(adminUser);
      navigate("/admin");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <main className="auth-root">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Admin Login</h1>
          <p>Enter admin credentials to access management.</p>

          {message && (
            <div
              className={`message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Login as Admin
            </button>
          </form>

          <div className="auth-links">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Back to User Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
