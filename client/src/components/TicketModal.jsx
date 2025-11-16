import React from "react";
import {
  generateDonationTicket,
  generateBloodRequestTicket,
  downloadTicket,
  printTicket,
} from "../utils/ticketGenerator";

export default function TicketModal({ isOpen, onClose, ticket, type }) {
  if (!isOpen || !ticket) return null;

  const handleDownload = () => {
    const ticketHTML =
      type === "donation"
        ? generateDonationTicket(ticket)
        : generateBloodRequestTicket(ticket);
    downloadTicket(ticketHTML, ticket.ticketId, type);
  };

  const handlePrint = () => {
    const ticketHTML =
      type === "donation"
        ? generateDonationTicket(ticket)
        : generateBloodRequestTicket(ticket);
    printTicket(ticketHTML);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content ticket-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="ticket-modal-header">
          <div className="success-icon">✓</div>
          <h2>
            {type === "donation"
              ? "Donation Request Submitted!"
              : "Blood Request Submitted!"}
          </h2>
          <p>Your ticket has been generated successfully</p>
        </div>

        <div className="ticket-modal-body">
          <div className="ticket-id-display">
            <span className="ticket-label">Ticket ID:</span>
            <span className="ticket-id-value">{ticket.ticketId}</span>
          </div>

          <div className="ticket-details">
            {type === "donation" ? (
              <>
                <div className="detail-row">
                  <span className="detail-label">Donor Name:</span>
                  <span className="detail-value">{ticket.donorName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Blood Type:</span>
                  <span className="detail-value">{ticket.bloodType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Blood Center:</span>
                  <span className="detail-value">
                    {ticket.bloodCenter?.name || "N/A"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${ticket.status}`}>
                    {ticket.status}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="detail-row">
                  <span className="detail-label">Patient Name:</span>
                  <span className="detail-value">{ticket.patientName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Blood Type:</span>
                  <span className="detail-value">{ticket.bloodType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Units Needed:</span>
                  <span className="detail-value">{ticket.unitsNeeded}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Hospital:</span>
                  <span className="detail-value">{ticket.hospitalName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Urgency:</span>
                  <span className={`urgency-badge ${ticket.urgency}`}>
                    {ticket.urgency}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${ticket.status}`}>
                    {ticket.status}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="ticket-info-note">
            <p>
              <strong>📋 Save this ticket for your records.</strong> You can
              download or print it using the buttons below.
            </p>
          </div>
        </div>

        <div className="ticket-modal-footer">
          <button className="btn-secondary" onClick={handlePrint}>
            🖨️ Print Ticket
          </button>
          <button className="btn-primary" onClick={handleDownload}>
            💾 Download Ticket
          </button>
          <button className="btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
