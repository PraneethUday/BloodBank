import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [pendingDonations, setPendingDonations] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [bloodCenters, setBloodCenters] = useState([]);
  const [activeTab, setActiveTab] = useState("donations");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [donationsRes, requestsRes, centersRes] = await Promise.all([
        axios.get("http://localhost:4000/donation", {
          headers: { Authorization: `Bearer admin-token` },
        }),
        axios.get("http://localhost:4000/blood-requests", {
          headers: { Authorization: `Bearer admin-token` },
        }),
        axios.get("http://localhost:4000/blood-centers"),
      ]);

      setPendingDonations(
        donationsRes.data.donations.filter(
          (donation) => donation.status === "pending"
        ) || []
      );
      setPendingRequests(
        requestsRes.data.requests.filter((req) => req.status === "pending") ||
          []
      );
      setBloodCenters(centersRes.data.centers || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error loading data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveDonation = async (donationId) => {
    try {
      await axios.put(
        `http://localhost:4000/donation/${donationId}/status`,
        { status: "approved" },
        {
          headers: { Authorization: `Bearer admin-token` },
        }
      );
      setMessage("Donation approved successfully!");
      fetchData(); // Refresh data
    } catch (error) {
      setMessage("Error approving donation");
    }
  };

  const handleRejectDonation = async (donationId) => {
    try {
      await axios.put(
        `http://localhost:4000/donation/${donationId}/status`,
        { status: "rejected" },
        {
          headers: { Authorization: `Bearer admin-token` },
        }
      );
      setMessage("Donation rejected");
      fetchData(); // Refresh data
    } catch (error) {
      setMessage("Error rejecting donation");
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:4000/blood-requests/${requestId}/status`,
        { status: "approved" },
        {
          headers: { Authorization: `Bearer admin-token` },
        }
      );
      setMessage("Blood request approved successfully!");
      fetchData(); // Refresh data
    } catch (error) {
      setMessage("Error approving request");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(
        `http://localhost:4000/blood-requests/${requestId}/status`,
        { status: "rejected" },
        {
          headers: { Authorization: `Bearer admin-token` },
        }
      );
      setMessage("Blood request rejected");
      fetchData(); // Refresh data
    } catch (error) {
      setMessage("Error rejecting request");
    }
  };

  const handleStockUpdate = async (centerId, bloodType, newUnits) => {
    try {
      await axios.put(
        `http://localhost:4000/blood-centers/${centerId}/stock`,
        { bloodType, units: newUnits },
        {
          headers: { Authorization: `Bearer admin-token` },
        }
      );
      setMessage(
        `Stock updated for ${bloodType} at ${
          bloodCenters.find((c) => c._id === centerId)?.name
        }`
      );
      fetchData(); // Refresh data
    } catch (error) {
      setMessage("Error updating stock");
    }
  };

  if (isLoading) {
    return (
      <main className="admin-dashboard-root">
        <div className="loading">Loading admin dashboard...</div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-root fade-up">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button
            className="exit-btn"
            onClick={() => (window.location.href = "/")}
          >
            Exit
          </button>
        </div>
        <p>Manage donations and blood requests</p>

        {message && (
          <div
            className={`message ${
              message.includes("success") || message.includes("approved")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === "donations" ? "active" : ""}`}
            onClick={() => setActiveTab("donations")}
          >
            Pending Donations ({pendingDonations.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "requests" ? "active" : ""}`}
            onClick={() => setActiveTab("requests")}
          >
            Pending Requests ({pendingRequests.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "stocks" ? "active" : ""}`}
            onClick={() => setActiveTab("stocks")}
          >
            Blood Stock Overview
          </button>
        </div>

        {activeTab === "donations" && (
          <div className="donations-section">
            <h2>Pending Donation Requests</h2>
            {pendingDonations.length === 0 ? (
              <p>No pending donations</p>
            ) : (
              <div className="donations-list">
                {pendingDonations.map((donation) => (
                  <div key={donation._id} className="donation-item">
                    <div className="donation-header">
                      <h3>{donation.donorName}</h3>
                      <span className="status pending">Pending</span>
                    </div>
                    <div className="donation-details">
                      <p>
                        <strong>Blood Type:</strong> {donation.bloodType}
                      </p>
                      <p>
                        <strong>Phone:</strong> {donation.phone}
                      </p>
                      <p>
                        <strong>Age:</strong> {donation.age}
                      </p>
                      <p>
                        <strong>Weight:</strong> {donation.weight}kg
                      </p>
                      <p>
                        <strong>Center:</strong>{" "}
                        {donation.bloodCenter?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Medical History:</strong>{" "}
                        {donation.medicalHistory || "None"}
                      </p>
                    </div>
                    <div className="donation-actions">
                      <button
                        className="btn-approve"
                        onClick={() => handleApproveDonation(donation._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleRejectDonation(donation._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="requests-section">
            <h2>Pending Blood Requests</h2>
            {pendingRequests.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              <div className="requests-list">
                {pendingRequests.map((request) => (
                  <div key={request._id} className="request-item">
                    <div className="request-header">
                      <h3>{request.patientInfo?.name || "Patient"}</h3>
                      <span className="status pending">Pending</span>
                    </div>
                    <div className="request-details">
                      <p>
                        <strong>Blood Type:</strong> {request.bloodType}
                      </p>
                      <p>
                        <strong>Units Needed:</strong> {request.unitsNeeded}
                      </p>
                      <p>
                        <strong>Requester:</strong> {request.requesterName}
                      </p>
                      <p>
                        <strong>Hospital:</strong>{" "}
                        {request.hospitalDetails?.name || "N/A"}
                      </p>
                      <p>
                        <strong>Urgency:</strong> {request.urgency}
                      </p>
                    </div>
                    <div className="request-actions">
                      <button
                        className="btn-approve"
                        onClick={() => handleApproveRequest(request._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleRejectRequest(request._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "stocks" && (
          <div className="stocks-section">
            <h2>Blood Stock Management</h2>
            <div className="centers-grid">
              {bloodCenters.map((center) => (
                <div key={center._id} className="center-card">
                  <h3>{center.name}</h3>
                  <p className="center-location">{center.location}</p>
                  <div className="stock-grid">
                    {Object.entries(center.bloodStock || {}).map(
                      ([type, units]) => (
                        <div
                          key={type}
                          className={`stock-item ${
                            units > 0 ? "available" : "unavailable"
                          }`}
                        >
                          <div className="blood-type">{type}</div>
                          <div className="units">
                            <input
                              type="number"
                              min="0"
                              value={units}
                              onChange={(e) =>
                                handleStockUpdate(
                                  center._id,
                                  type,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="stock-input"
                            />{" "}
                            units
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
