const express = require("express");
const BloodCenter = require("../models/BloodCenter");
const { activityLogger } = require("../middleware/activityLogger");

const router = express.Router();

// Get all blood centers
router.get("/", async (req, res) => {
  try {
    const centers = await BloodCenter.find({ isActive: true });
    res.json({ centers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get blood center by ID
router.get("/:id", async (req, res) => {
  try {
    const center = await BloodCenter.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ message: "Blood center not found" });
    }
    res.json({ center });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update blood stock (admin route)
router.put(
  "/:id/stock",
  activityLogger("BLOOD_STOCK_UPDATE", (req, res, responseData) => {
    const { bloodType, units } = req.body;
    return `Admin updated blood stock for center ${req.params.id}: ${bloodType} to ${units} units`;
  }),
  async (req, res) => {
    try {
      const { bloodType, units } = req.body;
      const update = {};
      update[`bloodStock.${bloodType}`] = units;

      const center = await BloodCenter.findByIdAndUpdate(
        req.params.id,
        { $set: update },
        { new: true }
      );

      if (!center) {
        return res.status(404).json({ message: "Blood center not found" });
      }

      res.json({
        message: "Blood stock updated successfully",
        center,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Add new blood center (admin route)
router.post(
  "/",
  activityLogger("BLOOD_CENTER_ADD", (req, res, responseData) => {
    const { name, location } = req.body;
    return `Admin added new blood center: ${name} at ${location}`;
  }),
  async (req, res) => {
    try {
      const center = new BloodCenter(req.body);
      await center.save();

      res.status(201).json({
        message: "Blood center added successfully",
        center,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
