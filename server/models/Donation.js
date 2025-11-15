const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Donation", donationSchema);
