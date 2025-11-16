const mongoose = require("mongoose");

// Function to generate unique ticket ID
function generateTicketId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketId = "REQ-";
  for (let i = 0; i < 6; i++) {
    ticketId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ticketId;
}

const bloodRequestSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
    trim: true,
  },
  requesterName: {
    type: String,
    required: true,
    trim: true,
  },
  requesterEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  requesterPhone: {
    type: String,
    required: true,
    trim: true,
  },
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  unitsNeeded: {
    type: Number,
    required: true,
    min: 1,
  },
  urgency: {
    type: String,
    enum: ["low", "medium", "high", "critical"],
    default: "medium",
  },
  hospitalName: {
    type: String,
    required: true,
    trim: true,
  },
  hospitalAddress: {
    type: String,
    required: true,
    trim: true,
  },
  doctorName: {
    type: String,
    required: true,
    trim: true,
  },
  doctorPhone: {
    type: String,
    required: true,
    trim: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "fulfilled", "cancelled"],
    default: "pending",
  },
  assignedCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BloodCenter",
  },
  fulfilledDate: {
    type: Date,
  },
});

// Pre-save hook to generate ticket ID
bloodRequestSchema.pre("save", async function (next) {
  if (!this.ticketId) {
    let isUnique = false;
    while (!isUnique) {
      const ticketId = generateTicketId();
      const existing = await mongoose
        .model("BloodRequest")
        .findOne({ ticketId });
      if (!existing) {
        this.ticketId = ticketId;
        isUnique = true;
      }
    }
  }
  next();
});

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
