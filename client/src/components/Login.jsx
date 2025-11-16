import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Check for admin login
      if (formData.email === "admin" && formData.password === "admin") {
        const adminUser = { email: "admin", name: "Admin", role: "admin" };
        localStorage.setItem("token", "admin-token");
        localStorage.setItem("user", JSON.stringify(adminUser));
        setMessage("Admin login successful!");
        onLogin(adminUser);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Login successful!");
      onLogin(user);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-root">
      <div className="auth-container">
        <div className="auth-form">
          <h1>Login to BloodBank</h1>
          <p>Welcome back! Please sign in to your account.</p>

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
            <div className="form-group slide-in-red">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group slide-in-red">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-links">
            <p>
              Don't have an account? <a href="#signup">Sign up here</a>
            </p>
            <button
              type="button"
              className="btn-secondary admin-btn"
              onClick={() => (window.location.href = "/admin")}
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
