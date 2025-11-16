import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";
import TicketModal from "./TicketModal";
import {
  generateDonationTicket,
  downloadTicket,
  printTicket,
} from "../utils/ticketGenerator";

export default function DonateForm() {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("form");
  const [formData, setFormData] = useState({
    donorName: "",
    phone: "",
    bloodType: "",
    age: "",
    weight: "",
    address: "",
    medicalHistory: "",
    lastDonation: "",
    bloodCenter: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
  });

  const [bloodCenters, setBloodCenters] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBloodCenters = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blood-centers`);
        setBloodCenters(response.data.centers);
      } catch (error) {
        console.error("Error fetching blood centers:", error);
      }
    };

    const fetchDonationHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}/donation/history`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDonationHistory(response.data.donations);
        }
      } catch (error) {
        console.error("Error fetching donation history:", error);
      }
    };

    fetchBloodCenters();
    fetchDonationHistory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("emergencyContact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login to submit a donation request");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/donation`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Donation request submitted successfully!");
      setCurrentTicket(response.data.donation);
      setShowTicketModal(true);

      // Refresh donation history
      const historyResponse = await axios.get(
        `${API_BASE_URL}/donation/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDonationHistory(historyResponse.data.donations);

      setFormData({
        donorName: "",
        phone: "",
        bloodType: "",
        age: "",
        weight: "",
        address: "",
        medicalHistory: "",
        lastDonation: "",
        emergencyContact: {
          name: "",
          phone: "",
          relationship: "",
        },
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadTicket = (donation) => {
    const ticketHTML = generateDonationTicket(donation);
    downloadTicket(ticketHTML, donation.ticketId, "donation");
  };

  const handlePrintTicket = (donation) => {
    const ticketHTML = generateDonationTicket(donation);
    printTicket(ticketHTML);
  };

  const approvedDonations = donationHistory.filter(
    (donation) => donation.status === "approved"
  );

  return (
    <main className="donate-form-root fade-up">
      <TicketModal
        isOpen={showTicketModal}
        onClose={() => setShowTicketModal(false)}
        ticket={currentTicket}
        type="donation"
      />

      <div className="form-container">
        <div className="form-header">
          <h1>Donate Blood</h1>
          <p>Fill out this form to schedule your blood donation appointment</p>
        </div>

        {donationHistory.length > 0 && (
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === "form" ? "active" : ""}`}
              onClick={() => setActiveTab("form")}
            >
              Donate Blood
            </button>
            <button
              className={`tab-btn ${activeTab === "approved" ? "active" : ""}`}
              onClick={() => setActiveTab("approved")}
            >
              Approved Donations ({approvedDonations.length})
            </button>
            <button
              className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              All Donations ({donationHistory.length})
            </button>
          </div>
        )}

        {activeTab === "form" && (
          <>
            {message && (
              <div
                className={`message ${
                  message.includes("success") ? "success" : "error"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="donation-form">
              <div className="form-section">
                <h2>Personal Information</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="donorName">Full Name *</label>
                    <input
                      type="text"
                      id="donorName"
                      name="donorName"
                      value={formData.donorName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="bloodType">Blood Type *</label>
                    <select
                      id="bloodType"
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age *</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min="18"
                      max="65"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="weight">Weight (kg) *</label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      min="50"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastDonation">Last Donation Date</label>
                    <input
                      type="date"
                      id="lastDonation"
                      name="lastDonation"
                      value={formData.lastDonation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="bloodCenter">Preferred Blood Center *</label>
                  <select
                    id="bloodCenter"
                    name="bloodCenter"
                    value={formData.bloodCenter}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Center</option>
                    {bloodCenters.map((center) => (
                      <option key={center._id} value={center._id}>
                        {center.name} - {center.location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="medicalHistory">Medical History</label>
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    placeholder="Please list any medical conditions, medications, or recent illnesses"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="form-section">
                <h2>Emergency Contact</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="emergencyContact.name">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="emergencyContact.name"
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emergencyContact.phone">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      id="emergencyContact.phone"
                      name="emergencyContact.phone"
                      value={formData.emergencyContact.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContact.relationship">
                    Relationship *
                  </label>
                  <input
                    type="text"
                    id="emergencyContact.relationship"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleChange}
                    placeholder="e.g., Spouse, Parent, Friend"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Donation Request"}
              </button>
            </form>
          </>
        )}

        {(activeTab === "approved" || activeTab === "history") &&
          donationHistory.length > 0 && (
            <div className="donation-history">
              <h2>
                {activeTab === "approved"
                  ? "Approved Donation Tickets"
                  : "All Donation Tickets"}
              </h2>
              <p className="history-subtitle">
                View and download your donation tickets
              </p>
              <div className="tickets-grid">
                {(activeTab === "approved"
                  ? approvedDonations
                  : donationHistory
                ).map((donation) => (
                  <div key={donation._id} className="ticket-card">
                    <div className="ticket-card-header">
                      <div className="ticket-id-badge">{donation.ticketId}</div>
                      <span className={`status-badge ${donation.status}`}>
                        {donation.status}
                      </span>
                    </div>
                    <div className="ticket-card-body">
                      <div className="ticket-info">
                        <span className="info-icon">👤</span>
                        <div>
                          <div className="info-label">Donor</div>
                          <div className="info-value">{donation.donorName}</div>
                        </div>
                      </div>
                      <div className="ticket-info">
                        <span className="info-icon">🩸</span>
                        <div>
                          <div className="info-label">Blood Type</div>
                          <div className="info-value">{donation.bloodType}</div>
                        </div>
                      </div>
                      <div className="ticket-info">
                        <span className="info-icon">🏥</span>
                        <div>
                          <div className="info-label">Blood Center</div>
                          <div className="info-value">
                            {donation.bloodCenter?.name || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="ticket-info">
                        <span className="info-icon">📅</span>
                        <div>
                          <div className="info-label">Date</div>
                          <div className="info-value">
                            {new Date(
                              donation.donationDate
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ticket-card-footer">
                      <button
                        className="btn-icon"
                        onClick={() => handlePrintTicket(donation)}
                        title="Print Ticket"
                      >
                        🖨️
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => handleDownloadTicket(donation)}
                        title="Download Ticket"
                      >
                        💾
                      </button>
                      <button
                        className="btn-small"
                        onClick={() => {
                          setCurrentTicket(donation);
                          setShowTicketModal(true);
                        }}
                      >
                        View Details
                      </button>
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
