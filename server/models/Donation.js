const mongoose = require("mongoose");

// Function to generate unique ticket ID
function generateTicketId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ticketId = 'DON-';
  for (let i = 0; i < 6; i++) {
    ticketId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ticketId;
}

const donationSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
    trim: true,
  },
  donorName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  weight: {
    type: Number,
    required: true,
    min: 50,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  medicalHistory: {
    type: String,
    trim: true,
  },
  lastDonation: {
    type: Date,
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    relationship: {
      type: String,
      required: true,
      trim: true,
    },
  },
  bloodCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BloodCenter",
    required: true,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "completed", "rejected"],
    default: "pending",
  },
});

// Pre-save hook to generate ticket ID
donationSchema.pre('save', async function(next) {
  if (!this.ticketId) {
    let isUnique = false;
    while (!isUnique) {
      const ticketId = generateTicketId();
      const existing = await mongoose.model('Donation').findOne({ ticketId });
      if (!existing) {
        this.ticketId = ticketId;
        isUnique = true;
      }
    }
  }
  next();
});

module.exports = mongoose.model("Donation", donationSchema);
