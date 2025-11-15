const express = require("express");
const ActivityLog = require("../models/ActivityLog");

const router = express.Router();

// Get all activity logs (admin only)
router.get("/", async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(1000); // Limit to last 1000 logs for performance

    res.json({ logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get logs by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const logs = await ActivityLog.find({ userId: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({ logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get logs by action type
router.get("/action/:action", async (req, res) => {
  try {
    const logs = await ActivityLog.find({ action: req.params.action })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({ logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get logs within date range
router.get("/date-range", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const logs = await ActivityLog.find({
      timestamp: {
        $gte: start,
        $lte: end,
      },
    })
      .sort({ timestamp: -1 })
      .limit(500);

    res.json({ logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
