import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BloodRequest({ user }) {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    unitsNeeded: "",
    urgency: "medium",
    hospitalName: "",
    hospitalAddress: "",
    doctorName: "",
    doctorPhone: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [myRequests, setMyRequests] = useState([]);

  useEffect(() => {
    if (user) {
      fetchMyRequests();
    }
  }, [user]);

  const fetchMyRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/blood-requests/my-requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

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
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login to submit a blood request");
        setIsSubmitting(false);
        return;
      }

      const requestData = {
        ...formData,
        requesterName: user.name,
        requesterEmail: user.email,
        requesterPhone: user.phone || "1234567890", // Default phone if not available
        unitsNeeded: parseInt(formData.unitsNeeded),
      };

      const response = await axios.post(
        "http://localhost:4000/blood-requests",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Blood request submitted successfully!");
      setFormData({
        patientName: "",
        bloodType: "",
        unitsNeeded: "",
        urgency: "medium",
        hospitalName: "",
        hospitalAddress: "",
        doctorName: "",
        doctorPhone: "",
        reason: "",
      });
      fetchMyRequests();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error submitting request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="blood-request-root fade-up">
      <div className="request-container">
        <h1>Request Blood</h1>
        <p>Submit a request for blood units needed for medical treatment</p>

        {message && (
          <div
            className={`message ${
              message.includes("success") ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="request-form">
          <div className="form-section">
            <h2>Patient Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patientName">Patient Name *</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bloodType">Blood Type Required *</label>
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="unitsNeeded">Units Needed *</label>
                <input
                  type="number"
                  id="unitsNeeded"
                  name="unitsNeeded"
                  min="1"
                  value={formData.unitsNeeded}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="urgency">Urgency Level *</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Hospital Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hospitalName">Hospital Name *</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="doctorName">Doctor Name *</label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hospitalAddress">Hospital Address *</label>
                <textarea
                  id="hospitalAddress"
                  name="hospitalAddress"
                  value={formData.hospitalAddress}
                  onChange={handleChange}
                  required
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="doctorPhone">Doctor Phone *</label>
                <input
                  type="tel"
                  id="doctorPhone"
                  name="doctorPhone"
                  value={formData.doctorPhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Request *</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                placeholder="Please provide details about why blood is needed"
                rows="4"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Request..." : "Submit Blood Request"}
          </button>
        </form>

        {myRequests.length > 0 && (
          <div className="my-requests">
            <h2>My Blood Requests</h2>
            <div className="requests-list">
              {myRequests.map((request) => (
                <div key={request._id} className="request-item">
                  <div className="request-header">
                    <h3>{request.patientName}</h3>
                    <span className={`status ${request.status}`}>
                      {request.status}
                    </span>
                  </div>
                  <p>
                    <strong>Blood Type:</strong> {request.bloodType}
                  </p>
                  <p>
                    <strong>Units Needed:</strong> {request.unitsNeeded}
                  </p>
                  <p>
                    <strong>Urgency:</strong> {request.urgency}
                  </p>
                  <p>
                    <strong>Hospital:</strong> {request.hospitalName}
                  </p>
                  <p>
                    <strong>Requested:</strong>{" "}
                    {new Date(request.requestDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
