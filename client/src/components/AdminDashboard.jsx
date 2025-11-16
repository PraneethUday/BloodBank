import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

export default function AdminDashboard({ onLogout }) {
  const [pendingDonations, setPendingDonations] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [bloodCenters, setBloodCenters] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("donations");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [pendingDonations, searchTerm, dateFilter]);

  useEffect(() => {
    filterRequests();
  }, [pendingRequests, searchTerm, dateFilter]);

  useEffect(() => {
    filterLogs();
  }, [activityLogs, searchTerm, dateFilter]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [donationsRes, requestsRes, centersRes, logsRes] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/donation`, {
            headers: { Authorization: `Bearer admin-token` },
          }),
          axios.get(`${API_BASE_URL}/blood-requests`, {
            headers: { Authorization: `Bearer admin-token` },
          }),
          axios.get(`${API_BASE_URL}/blood-centers`),
          axios.get(`${API_BASE_URL}/activity-logs`, {
            headers: { Authorization: `Bearer admin-token` },
          }),
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
      setActivityLogs(logsRes.data.logs || []);
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
        `${API_BASE_URL}/donation/${donationId}/status`,
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
        `${API_BASE_URL}/donation/${donationId}/status`,
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
        `${API_BASE_URL}/blood-requests/${requestId}/status`,
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
        `${API_BASE_URL}/blood-requests/${requestId}/status`,
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
        `${API_BASE_URL}/blood-centers/${centerId}/stock`,
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

  const filterDonations = () => {
    let filtered = pendingDonations;

    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((donation) => {
        const donationDate = new Date(donation.createdAt || donation.date)
          .toISOString()
          .split("T")[0];
        return donationDate === dateFilter;
      });
    }

    // Sort by latest first
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    );

    setFilteredDonations(filtered);
  };

  const filterRequests = () => {
    let filtered = pendingRequests;

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.patientInfo?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.requesterName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          request.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((request) => {
        const requestDate = new Date(request.createdAt || request.date)
          .toISOString()
          .split("T")[0];
        return requestDate === dateFilter;
      });
    }

    // Sort by latest first
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    );

    setFilteredRequests(filtered);
  };

  const filterLogs = () => {
    let filtered = activityLogs;

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.userType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.timestamp).toISOString().split("T")[0];
        return logDate === dateFilter;
      });
    }

    // Sort by latest first
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredLogs(filtered);
  };

  if (isLoading) {
    return (
      <main className="admin-dashboard-root">
        <div className="loading">Loading admin dashboard...</div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard-root fade-in-dark bounce-in-dark">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Blood Bank Management Dashboard</h1>
          <button
            className="exit-btn"
            onClick={() => {
              onLogout();
              window.location.href = "/";
            }}
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
          <button
            className={`tab-btn ${activeTab === "logs" ? "active" : ""}`}
            onClick={() => setActiveTab("logs")}
          >
            Activity Logs ({activityLogs.length})
          </button>
        </div>

        {(activeTab === "donations" ||
          activeTab === "requests" ||
          activeTab === "logs") && (
          <div className="filters-section slide-in-dark">
            <div className="filter-group">
              <input
                type="text"
                placeholder={
                  activeTab === "logs"
                    ? "Search by action, details, or user type..."
                    : "Search by name or blood type..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="date-input"
              />
              <button
                className="clear-filters-btn shake-dark"
                onClick={() => {
                  setSearchTerm("");
                  setDateFilter("");
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {activeTab === "donations" && (
          <div className="donations-section slide-in-dark">
            <h2>Pending Donation Requests</h2>
            {filteredDonations.length === 0 ? (
              <p>No pending donations</p>
            ) : (
              <div className="donations-list">
                {filteredDonations.map((donation) => (
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
          <div className="requests-section slide-in-dark">
            <h2>Pending Blood Requests</h2>
            {filteredRequests.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              <div className="requests-list">
                {filteredRequests.map((request) => (
                  <div
                    key={request._id}
                    className={`request-item urgency-${request.urgency}`}
                  >
                    <div className="request-header">
                      <h3>
                        {request.patientInfo?.name ||
                          request.patientName ||
                          "Patient"}
                      </h3>
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
          <div className="stocks-section slide-in-dark">
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

        {activeTab === "logs" && (
          <div className="logs-section slide-in-dark">
            <h2>Activity Logs</h2>
            {filteredLogs.length === 0 ? (
              <p>No activity logs found</p>
            ) : (
              <div className="logs-list">
                {filteredLogs.map((log) => (
                  <div key={log._id} className="log-item">
                    <div className="log-header">
                      <span className="log-action">{log.action}</span>
                      <span className="log-user-type">{log.userType}</span>
                      <span className="log-timestamp">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="log-details">
                      <p>{log.details}</p>
                      {log.ipAddress && (
                        <p className="log-meta">
                          <strong>IP:</strong> {log.ipAddress} |{" "}
                          <strong>User Agent:</strong> {log.userAgent}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
