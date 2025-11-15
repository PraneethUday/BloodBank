const express = require("express");
const jwt = require("jsonwebtoken");
const BloodRequest = require("../models/BloodRequest");
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

// Submit blood request
router.post(
  "/",
  authenticateToken,
  activityLogger("BLOOD_REQUEST_SUBMIT", (req, res, responseData) => {
    const { bloodType, unitsNeeded, urgency } = req.body;
    return `User ${req.user.email} submitted blood request for ${unitsNeeded} units of ${bloodType} (${urgency} urgency)`;
  }),
  async (req, res) => {
    try {
      const requestData = {
        ...req.body,
        requesterEmail: req.user.email,
      };

      const bloodRequest = new BloodRequest(requestData);
      await bloodRequest.save();

      res.status(201).json({
        message: "Blood request submitted successfully",
        request: bloodRequest,
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

// Get user's blood requests
router.get("/my-requests", authenticateToken, async (req, res) => {
  try {
    const requests = await BloodRequest.find({
      requesterEmail: req.user.email,
    }).sort({ requestDate: -1 });

    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all blood requests (admin route)
router.get("/", async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .sort({ requestDate: -1 })
      .populate("assignedCenter", "name location");

    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update request status (admin route)
router.put(
  "/:id/status",
  activityLogger("BLOOD_REQUEST_STATUS_UPDATE", (req, res, responseData) => {
    const { status, assignedCenter } = req.body;
    return `Admin updated blood request ${req.params.id} status to ${status}${
      assignedCenter ? ` and assigned to center ${assignedCenter}` : ""
    }`;
  }),
  async (req, res) => {
    try {
      const { status, assignedCenter } = req.body;
      const update = { status };

      if (assignedCenter) {
        update.assignedCenter = assignedCenter;
      }

      if (status === "fulfilled") {
        update.fulfilledDate = new Date();
      }

      const request = await BloodRequest.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true }
      ).populate("assignedCenter", "name location");

      if (!request) {
        return res.status(404).json({ message: "Blood request not found" });
      }

      res.json({
        message: "Request status updated",
        request,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Get pending blood requests (admin route)
router.get("/pending", async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: "pending" })
      .sort({ requestDate: -1 })
      .populate("assignedCenter", "name location");

    res.json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Approve blood request (admin route)
router.put(
  "/:id/approve",
  activityLogger("BLOOD_REQUEST_APPROVE", (req, res, responseData) => {
    return `Admin approved blood request ${req.params.id}`;
  }),
  async (req, res) => {
    try {
      const request = await BloodRequest.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
      ).populate("assignedCenter", "name location");

      if (!request) {
        return res.status(404).json({ message: "Blood request not found" });
      }

      res.json({
        message: "Blood request approved",
        request,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Reject blood request (admin route)
router.put(
  "/:id/reject",
  activityLogger("BLOOD_REQUEST_REJECT", (req, res, responseData) => {
    return `Admin rejected blood request ${req.params.id}`;
  }),
  async (req, res) => {
    try {
      const request = await BloodRequest.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" },
        { new: true }
      ).populate("assignedCenter", "name location");

      if (!request) {
        return res.status(404).json({ message: "Blood request not found" });
      }

      res.json({
        message: "Blood request rejected",
        request,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
