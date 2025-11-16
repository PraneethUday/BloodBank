// Utility to generate and download tickets

export const generateDonationTicket = (donation) => {
  const ticketHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Blood Donation Ticket - ${donation.ticketId}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Arial', sans-serif;
          padding: 40px;
          background: #f5f5f5;
        }
        .ticket {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border: 2px solid #e74c3c;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .ticket-header {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .ticket-header h1 {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .ticket-id {
          font-size: 24px;
          font-weight: bold;
          background: rgba(255,255,255,0.2);
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
          margin-top: 10px;
        }
        .ticket-body {
          padding: 40px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 20px;
          color: #e74c3c;
          margin-bottom: 15px;
          border-bottom: 2px solid #e74c3c;
          padding-bottom: 5px;
        }
        .info-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .info-label {
          font-weight: bold;
          width: 200px;
          color: #555;
        }
        .info-value {
          flex: 1;
          color: #333;
        }
        .status-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-pending {
          background: #f39c12;
          color: white;
        }
        .status-approved {
          background: #27ae60;
          color: white;
        }
        .status-rejected {
          background: #e74c3c;
          color: white;
        }
        .status-completed {
          background: #3498db;
          color: white;
        }
        .ticket-footer {
          background: #f8f9fa;
          padding: 20px 40px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .important-note {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin-top: 20px;
          color: #856404;
        }
        @media print {
          body {
            padding: 0;
            background: white;
          }
          .ticket {
            box-shadow: none;
            border: 2px solid #e74c3c;
          }
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="ticket-header">
          <h1>🩸 Blood Donation Ticket</h1>
          <div class="ticket-id">${donation.ticketId}</div>
        </div>
        
        <div class="ticket-body">
          <div class="section">
            <h2 class="section-title">Donor Information</h2>
            <div class="info-row">
              <div class="info-label">Full Name:</div>
              <div class="info-value">${donation.donorName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Blood Type:</div>
              <div class="info-value"><strong>${
                donation.bloodType
              }</strong></div>
            </div>
            <div class="info-row">
              <div class="info-label">Age:</div>
              <div class="info-value">${donation.age} years</div>
            </div>
            <div class="info-row">
              <div class="info-label">Weight:</div>
              <div class="info-value">${donation.weight} kg</div>
            </div>
            <div class="info-row">
              <div class="info-label">Phone:</div>
              <div class="info-value">${donation.phone}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Email:</div>
              <div class="info-value">${donation.email}</div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Blood Center Details</h2>
            <div class="info-row">
              <div class="info-label">Center Name:</div>
              <div class="info-value">${
                donation.bloodCenter?.name || "N/A"
              }</div>
            </div>
            <div class="info-row">
              <div class="info-label">Location:</div>
              <div class="info-value">${
                donation.bloodCenter?.location || "N/A"
              }</div>
            </div>
            ${
              donation.bloodCenter?.address
                ? `
            <div class="info-row">
              <div class="info-label">Address:</div>
              <div class="info-value">${donation.bloodCenter.address}</div>
            </div>
            `
                : ""
            }
            ${
              donation.bloodCenter?.phone
                ? `
            <div class="info-row">
              <div class="info-label">Contact:</div>
              <div class="info-value">${donation.bloodCenter.phone}</div>
            </div>
            `
                : ""
            }
          </div>

          <div class="section">
            <h2 class="section-title">Donation Details</h2>
            <div class="info-row">
              <div class="info-label">Donation Date:</div>
              <div class="info-value">${new Date(
                donation.donationDate
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Status:</div>
              <div class="info-value">
                <span class="status-badge status-${donation.status}">${
    donation.status
  }</span>
              </div>
            </div>
            ${
              donation.lastDonation
                ? `
            <div class="info-row">
              <div class="info-label">Last Donation:</div>
              <div class="info-value">${new Date(
                donation.lastDonation
              ).toLocaleDateString()}</div>
            </div>
            `
                : ""
            }
          </div>

          <div class="section">
            <h2 class="section-title">Emergency Contact</h2>
            <div class="info-row">
              <div class="info-label">Name:</div>
              <div class="info-value">${
                donation.emergencyContact?.name || "N/A"
              }</div>
            </div>
            <div class="info-row">
              <div class="info-label">Phone:</div>
              <div class="info-value">${
                donation.emergencyContact?.phone || "N/A"
              }</div>
            </div>
            <div class="info-row">
              <div class="info-label">Relationship:</div>
              <div class="info-value">${
                donation.emergencyContact?.relationship || "N/A"
              }</div>
            </div>
          </div>

          <div class="important-note">
            <strong>⚠️ Important:</strong> Please bring this ticket and a valid ID to your donation appointment. 
            Ensure you are well-rested and have eaten before donating.
          </div>
        </div>

        <div class="ticket-footer">
          <p>Thank you for your generous donation! Your contribution can save up to 3 lives.</p>
          <p style="margin-top: 10px;">Generated on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return ticketHTML;
};

export const generateBloodRequestTicket = (request) => {
  const ticketHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Blood Request Ticket - ${request.ticketId}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Arial', sans-serif;
          padding: 40px;
          background: #f5f5f5;
        }
        .ticket {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border: 2px solid #3498db;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .ticket-header {
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .ticket-header h1 {
          font-size: 32px;
          margin-bottom: 10px;
        }
        .ticket-id {
          font-size: 24px;
          font-weight: bold;
          background: rgba(255,255,255,0.2);
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
          margin-top: 10px;
        }
        .ticket-body {
          padding: 40px;
        }
        .section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 20px;
          color: #3498db;
          margin-bottom: 15px;
          border-bottom: 2px solid #3498db;
          padding-bottom: 5px;
        }
        .info-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .info-label {
          font-weight: bold;
          width: 200px;
          color: #555;
        }
        .info-value {
          flex: 1;
          color: #333;
        }
        .status-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-pending {
          background: #f39c12;
          color: white;
        }
        .status-approved {
          background: #27ae60;
          color: white;
        }
        .status-fulfilled {
          background: #3498db;
          color: white;
        }
        .status-cancelled {
          background: #e74c3c;
          color: white;
        }
        .urgency-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .urgency-low {
          background: #95a5a6;
          color: white;
        }
        .urgency-medium {
          background: #f39c12;
          color: white;
        }
        .urgency-high {
          background: #e67e22;
          color: white;
        }
        .urgency-critical {
          background: #e74c3c;
          color: white;
        }
        .ticket-footer {
          background: #f8f9fa;
          padding: 20px 40px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        .important-note {
          background: #ffebee;
          border-left: 4px solid #e74c3c;
          padding: 15px;
          margin-top: 20px;
          color: #c62828;
        }
        @media print {
          body {
            padding: 0;
            background: white;
          }
          .ticket {
            box-shadow: none;
            border: 2px solid #3498db;
          }
        }
      </style>
    </head>
    <body>
      <div class="ticket">
        <div class="ticket-header">
          <h1>🏥 Blood Request Ticket</h1>
          <div class="ticket-id">${request.ticketId}</div>
        </div>
        
        <div class="ticket-body">
          <div class="section">
            <h2 class="section-title">Patient Information</h2>
            <div class="info-row">
              <div class="info-label">Patient Name:</div>
              <div class="info-value">${request.patientName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Blood Type Required:</div>
              <div class="info-value"><strong>${
                request.bloodType
              }</strong></div>
            </div>
            <div class="info-row">
              <div class="info-label">Units Needed:</div>
              <div class="info-value"><strong>${
                request.unitsNeeded
              } unit(s)</strong></div>
            </div>
            <div class="info-row">
              <div class="info-label">Urgency Level:</div>
              <div class="info-value">
                <span class="urgency-badge urgency-${request.urgency}">${
    request.urgency
  }</span>
              </div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Hospital Information</h2>
            <div class="info-row">
              <div class="info-label">Hospital Name:</div>
              <div class="info-value">${request.hospitalName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Hospital Address:</div>
              <div class="info-value">${request.hospitalAddress}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Doctor Name:</div>
              <div class="info-value">${request.doctorName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Doctor Phone:</div>
              <div class="info-value">${request.doctorPhone}</div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Requester Information</h2>
            <div class="info-row">
              <div class="info-label">Requester Name:</div>
              <div class="info-value">${request.requesterName}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Email:</div>
              <div class="info-value">${request.requesterEmail}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Phone:</div>
              <div class="info-value">${request.requesterPhone}</div>
            </div>
          </div>

          <div class="section">
            <h2 class="section-title">Request Details</h2>
            <div class="info-row">
              <div class="info-label">Request Date:</div>
              <div class="info-value">${new Date(
                request.requestDate
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Status:</div>
              <div class="info-value">
                <span class="status-badge status-${request.status}">${
    request.status
  }</span>
              </div>
            </div>
            <div class="info-row">
              <div class="info-label">Reason:</div>
              <div class="info-value">${request.reason}</div>
            </div>
          </div>

          <div class="important-note">
            <strong>⚠️ Important:</strong> This is an official blood request ticket. Please present this at the blood center 
            or hospital. For urgent requests, contact the hospital directly.
          </div>
        </div>

        <div class="ticket-footer">
          <p>We are working to fulfill your blood request as quickly as possible.</p>
          <p style="margin-top: 10px;">Generated on ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return ticketHTML;
};

export const downloadTicket = (ticketHTML, ticketId, type) => {
  const blob = new Blob([ticketHTML], { type: "text/html" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${type}-ticket-${ticketId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const printTicket = (ticketHTML) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(ticketHTML);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 250);
};
