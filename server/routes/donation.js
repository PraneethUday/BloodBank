const express = require("express");
const jwt = require("jsonwebtoken");
const Donation = require("../models/Donation");
const { activityLogger } = require("../middleware/activityLogger");

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Submit donation form
router.post(
  "/",
  authenticateToken,
  activityLogger("DONATION_SUBMIT", (req, res, responseData) => {
    const { donorName, bloodType } = req.body;
    return `User ${req.user.email} submitted donation request for ${donorName} (${bloodType})`;
  }),
  async (req, res) => {
    try {
      const donationData = {
        ...req.body,
        email: req.user.email, // Use email from token
      };

      const donation = new Donation(donationData);
      await donation.save();

      // Populate blood center details for the response
      await donation.populate("bloodCenter", "name location address phone");

      res.status(201).json({
        message: "Donation request submitted successfully",
        donation,
      });
    } catch (error) {
      console.error(error);
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res
          .status(400)
          .json({ message: `Validation error: ${errors.join(", ")}` });
      }
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get user's donation history
router.get("/history", authenticateToken, async (req, res) => {
  try {
    const donations = await Donation.find({ email: req.user.email })
      .populate("bloodCenter", "name location address phone")
      .sort({ donationDate: -1 });

    res.json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all donations (admin route - for now public for demo)
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("bloodCenter", "name location address phone")
      .sort({ donationDate: -1 })
      .limit(50);

    res.json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update donation status (admin route)
router.put(
  "/:id/status",
  activityLogger("DONATION_STATUS_UPDATE", (req, res, responseData) => {
    const { status } = req.body;
    return `Admin updated donation ${req.params.id} status to ${status}`;
  }),
  async (req, res) => {
    try {
      const { status } = req.body;
      const donation = await Donation.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }

      // If approving donation, update blood stock
      if (status === "approved") {
        const BloodCenter = require("../models/BloodCenter");
        const center = await BloodCenter.findById(donation.bloodCenter);
        if (center) {
          if (!center.bloodStock[donation.bloodType]) {
            center.bloodStock[donation.bloodType] = 0;
          }
          center.bloodStock[donation.bloodType] += 1; // Add 1 unit
          await center.save();
        }
      }

      res.json({
        message: "Donation status updated",
        donation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get pending donations (admin route)
router.get("/pending", async (req, res) => {
  try {
    const donations = await Donation.find({ status: "pending" }).sort({
      donationDate: -1,
    });

    res.json({ donations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Approve donation (admin route)
router.put(
  "/:id/approve",
  activityLogger("DONATION_APPROVE", (req, res, responseData) => {
    return `Admin approved donation ${req.params.id}`;
  }),
  async (req, res) => {
    try {
      const donation = await Donation.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
      );

      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }

      // Update blood stock
      const BloodCenter = require("../models/BloodCenter");
      const center = await BloodCenter.findById(donation.bloodCenter);
      if (center) {
        center.bloodStock[donation.bloodType] += 1; // Add 1 unit
        await center.save();
      }

      res.json({
        message: "Donation approved and stock updated",
        donation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Reject donation (admin route)
router.put(
  "/:id/reject",
  activityLogger("DONATION_REJECT", (req, res, responseData) => {
    return `Admin rejected donation ${req.params.id}`;
  }),
  async (req, res) => {
    try {
      const donation = await Donation.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" },
        { new: true }
      );

      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }

      res.json({
        message: "Donation rejected",
        donation,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
