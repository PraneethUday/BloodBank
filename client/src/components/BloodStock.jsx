import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

export default function BloodStock() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBloodStock = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blood-centers`);
        setCenters(response.data.centers);
        setLoading(false);
      } catch (error) {
        setError("Failed to load blood stock data");
        setLoading(false);
      }
    };

    fetchBloodStock();
  }, []);

  if (loading) {
    return (
      <main className="blood-stock-root fade-up">
        <div className="loading">Loading blood stock...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="blood-stock-root fade-up">
        <div className="error">{error}</div>
      </main>
    );
  }

  return (
    <main className="blood-stock-root fade-up">
      <div className="stock-container">
        <h1>Blood Stock Availability</h1>
        <p>Check real-time blood availability across all centers</p>

        <div className="centers-grid">
          {centers.map((center) => (
            <div key={center._id} className="center-card">
              <h2>{center.name}</h2>
              <p className="center-location">{center.location}</p>
              <p className="center-address">{center.address}</p>

              <div className="stock-grid">
                {Object.entries(center.bloodStock).map(([type, units]) => (
                  <div
                    key={type}
                    className={`stock-item ${
                      units > 0 ? "available" : "unavailable"
                    }`}
                  >
                    <span className="blood-type">{type}</span>
                    <span className="units">{units} units</span>
                  </div>
                ))}
              </div>

              <div className="center-contact">
                <p>
                  <strong>Phone:</strong> {center.phone}
                </p>
                <p>
                  <strong>Email:</strong> {center.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
