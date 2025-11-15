import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DonateForm() {
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
        const response = await axios.get("http://localhost:4000/blood-centers");
        setBloodCenters(response.data.centers);
      } catch (error) {
        console.error("Error fetching blood centers:", error);
      }
    };

    fetchBloodCenters();
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

      const response = await axios.post(
        "http://localhost:4000/donation",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Donation request submitted successfully!");
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

  return (
    <main className="donate-form-root fade-up">
      <div className="form-container">
        <h1>Donate Blood</h1>
        <p>Fill out this form to schedule your blood donation appointment</p>

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
                <label htmlFor="emergencyContact.name">Contact Name *</label>
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
                <label htmlFor="emergencyContact.phone">Contact Phone *</label>
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
      </div>
    </main>
  );
}
